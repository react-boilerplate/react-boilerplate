'use strict';

// use Polyfill for util.promisify in node versions < v8
const promisify = require('util.promisify');

const vm = require('vm');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const childCompiler = require('./lib/compiler.js');
const prettyError = require('./lib/errors.js');
const chunkSorter = require('./lib/chunksorter.js');

const fsStatAsync = promisify(fs.stat);
const fsReadFileAsync = promisify(fs.readFile);

class HtmlWebpackPlugin {
  constructor (options) {
    // Default options
    this.options = _.extend({
      template: path.join(__dirname, 'default_index.ejs'),
      templateParameters: templateParametersGenerator,
      filename: 'index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      chunksSortMode: 'auto',
      meta: {},
      title: 'Webpack App',
      xhtml: false
    }, options);
  }

  apply (compiler) {
    const self = this;
    let isCompilationCached = false;
    let compilationPromise;

    this.options.template = this.getFullTemplatePath(this.options.template, compiler.context);

    // convert absolute filename into relative so that webpack can
    // generate it at correct location
    const filename = this.options.filename;
    if (path.resolve(filename) === path.normalize(filename)) {
      this.options.filename = path.relative(compiler.options.output.path, filename);
    }

    // setup hooks for webpack 4
    if (compiler.hooks) {
      compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', compilation => {
        const SyncWaterfallHook = require('tapable').SyncWaterfallHook;
        const AsyncSeriesWaterfallHook = require('tapable').AsyncSeriesWaterfallHook;
        compilation.hooks.htmlWebpackPluginAlterChunks = new SyncWaterfallHook(['chunks', 'objectWithPluginRef']);
        compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration = new AsyncSeriesWaterfallHook(['pluginArgs']);
        compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing = new AsyncSeriesWaterfallHook(['pluginArgs']);
        compilation.hooks.htmlWebpackPluginAlterAssetTags = new AsyncSeriesWaterfallHook(['pluginArgs']);
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing = new AsyncSeriesWaterfallHook(['pluginArgs']);
        compilation.hooks.htmlWebpackPluginAfterEmit = new AsyncSeriesWaterfallHook(['pluginArgs']);
      });
    }

    // Backwards compatible version of: compiler.hooks.make.tapAsync()
    (compiler.hooks ? compiler.hooks.make.tapAsync.bind(compiler.hooks.make, 'HtmlWebpackPlugin') : compiler.plugin.bind(compiler, 'make'))((compilation, callback) => {
      // Compile the template (queued)
      compilationPromise = childCompiler.compileTemplate(self.options.template, compiler.context, self.options.filename, compilation)
        .catch(err => {
          compilation.errors.push(prettyError(err, compiler.context).toString());
          return {
            content: self.options.showErrors ? prettyError(err, compiler.context).toJsonHtml() : 'ERROR',
            outputName: self.options.filename
          };
        })
        .then(compilationResult => {
          // If the compilation change didnt change the cache is valid
          isCompilationCached = compilationResult.hash && self.childCompilerHash === compilationResult.hash;
          self.childCompilerHash = compilationResult.hash;
          self.childCompilationOutputName = compilationResult.outputName;
          callback();
          return compilationResult.content;
        });
    });

    // Backwards compatible version of: compiler.plugin.emit.tapAsync()
    (compiler.hooks ? compiler.hooks.emit.tapAsync.bind(compiler.hooks.emit, 'HtmlWebpackPlugin') : compiler.plugin.bind(compiler, 'emit'))((compilation, callback) => {
      const applyPluginsAsyncWaterfall = self.applyPluginsAsyncWaterfall(compilation);
      // Get chunks info as json
      // Note: we're excluding stuff that we don't need to improve toJson serialization speed.
      const chunkOnlyConfig = {
        assets: false,
        cached: false,
        children: false,
        chunks: true,
        chunkModules: false,
        chunkOrigins: false,
        errorDetails: false,
        hash: false,
        modules: false,
        reasons: false,
        source: false,
        timings: false,
        version: false
      };
      const allChunks = compilation.getStats().toJson(chunkOnlyConfig).chunks;
      // Filter chunks (options.chunks and options.excludeCHunks)
      let chunks = self.filterChunks(allChunks, self.options.chunks, self.options.excludeChunks);
      // Sort chunks
      chunks = self.sortChunks(chunks, self.options.chunksSortMode, compilation);
      // Let plugins alter the chunks and the chunk sorting
      if (compilation.hooks) {
        chunks = compilation.hooks.htmlWebpackPluginAlterChunks.call(chunks, { plugin: self });
      } else {
        // Before Webpack 4
        chunks = compilation.applyPluginsWaterfall('html-webpack-plugin-alter-chunks', chunks, { plugin: self });
      }
      // Get assets
      const assets = self.htmlWebpackPluginAssets(compilation, chunks);
      // If this is a hot update compilation, move on!
      // This solves a problem where an `index.html` file is generated for hot-update js files
      // It only happens in Webpack 2, where hot updates are emitted separately before the full bundle
      if (self.isHotUpdateCompilation(assets)) {
        return callback();
      }

      // If the template and the assets did not change we don't have to emit the html
      const assetJson = JSON.stringify(self.getAssetFiles(assets));
      if (isCompilationCached && self.options.cache && assetJson === self.assetJson) {
        return callback();
      } else {
        self.assetJson = assetJson;
      }

      Promise.resolve()
        // Favicon
        .then(() => {
          if (self.options.favicon) {
            return self.addFileToAssets(self.options.favicon, compilation)
              .then(faviconBasename => {
                let publicPath = compilation.mainTemplate.getPublicPath({hash: compilation.hash}) || '';
                if (publicPath && publicPath.substr(-1) !== '/') {
                  publicPath += '/';
                }
                assets.favicon = publicPath + faviconBasename;
              });
          }
        })
        // Wait for the compilation to finish
        .then(() => compilationPromise)
        .then(compiledTemplate => {
          // Allow to use a custom function / string instead
          if (self.options.templateContent !== undefined) {
            return self.options.templateContent;
          }
          // Once everything is compiled evaluate the html factory
          // and replace it with its content
          return self.evaluateCompilationResult(compilation, compiledTemplate);
        })
        // Allow plugins to make changes to the assets before invoking the template
        // This only makes sense to use if `inject` is `false`
        .then(compilationResult => applyPluginsAsyncWaterfall('html-webpack-plugin-before-html-generation', false, {
          assets: assets,
          outputName: self.childCompilationOutputName,
          plugin: self
        })
      .then(() => compilationResult))
        // Execute the template
        .then(compilationResult => typeof compilationResult !== 'function'
        ? compilationResult
        : self.executeTemplate(compilationResult, chunks, assets, compilation))
        // Allow plugins to change the html before assets are injected
        .then(html => {
          const pluginArgs = {html: html, assets: assets, plugin: self, outputName: self.childCompilationOutputName};
          return applyPluginsAsyncWaterfall('html-webpack-plugin-before-html-processing', true, pluginArgs);
        })
        .then(result => {
          const html = result.html;
          const assets = result.assets;
          // Prepare script and link tags
          const assetTags = self.generateHtmlTags(assets);
          const pluginArgs = {head: assetTags.head, body: assetTags.body, plugin: self, chunks: chunks, outputName: self.childCompilationOutputName};
          // Allow plugins to change the assetTag definitions
          return applyPluginsAsyncWaterfall('html-webpack-plugin-alter-asset-tags', true, pluginArgs)
            .then(result => self.postProcessHtml(html, assets, { body: result.body, head: result.head })
            .then(html => _.extend(result, {html: html, assets: assets})));
        })
        // Allow plugins to change the html after assets are injected
        .then(result => {
          const html = result.html;
          const assets = result.assets;
          const pluginArgs = {html: html, assets: assets, plugin: self, outputName: self.childCompilationOutputName};
          return applyPluginsAsyncWaterfall('html-webpack-plugin-after-html-processing', true, pluginArgs)
            .then(result => result.html);
        })
        .catch(err => {
          // In case anything went wrong the promise is resolved
          // with the error message and an error is logged
          compilation.errors.push(prettyError(err, compiler.context).toString());
          // Prevent caching
          self.hash = null;
          return self.options.showErrors ? prettyError(err, compiler.context).toHtml() : 'ERROR';
        })
        .then(html => {
          // Replace the compilation result with the evaluated html code
          compilation.assets[self.childCompilationOutputName] = {
            source: () => html,
            size: () => html.length
          };
        })
        .then(() => applyPluginsAsyncWaterfall('html-webpack-plugin-after-emit', false, {
          html: compilation.assets[self.childCompilationOutputName],
          outputName: self.childCompilationOutputName,
          plugin: self
        }).catch(err => {
          console.error(err);
          return null;
        }).then(() => null))
        // Let webpack continue with it
        .then(() => {
          callback();
        });
    });
  }

  /**
   * Evaluates the child compilation result
   * Returns a promise
   */
  evaluateCompilationResult (compilation, source) {
    if (!source) {
      return Promise.reject('The child compilation didn\'t provide a result');
    }

    // The LibraryTemplatePlugin stores the template result in a local variable.
    // To extract the result during the evaluation this part has to be removed.
    source = source.replace('var HTML_WEBPACK_PLUGIN_RESULT =', '');
    const template = this.options.template.replace(/^.+!/, '').replace(/\?.+$/, '');
    const vmContext = vm.createContext(_.extend({HTML_WEBPACK_PLUGIN: true, require: require}, global));
    const vmScript = new vm.Script(source, {filename: template});
    // Evaluate code and cast to string
    let newSource;
    try {
      newSource = vmScript.runInContext(vmContext);
    } catch (e) {
      return Promise.reject(e);
    }
    if (typeof newSource === 'object' && newSource.__esModule && newSource.default) {
      newSource = newSource.default;
    }
    return typeof newSource === 'string' || typeof newSource === 'function'
      ? Promise.resolve(newSource)
      : Promise.reject('The loader "' + this.options.template + '" didn\'t return html.');
  }

  /**
   * Generate the template parameters for the template function
   */
  getTemplateParameters (compilation, assets) {
    if (typeof this.options.templateParameters === 'function') {
      return this.options.templateParameters(compilation, assets, this.options);
    }
    if (typeof this.options.templateParameters === 'object') {
      return this.options.templateParameters;
    }
    return {};
  }

  /**
   * Html post processing
   *
   * Returns a promise
   */
  executeTemplate (templateFunction, chunks, assets, compilation) {
    return Promise.resolve()
      // Template processing
      .then(() => {
        const templateParams = this.getTemplateParameters(compilation, assets);
        let html = '';
        try {
          html = templateFunction(templateParams);
        } catch (e) {
          compilation.errors.push(new Error('Template execution failed: ' + e));
          return Promise.reject(e);
        }
        return html;
      });
  }

  /**
   * Html post processing
   *
   * Returns a promise
   */
  postProcessHtml (html, assets, assetTags) {
    const self = this;
    if (typeof html !== 'string') {
      return Promise.reject('Expected html to be a string but got ' + JSON.stringify(html));
    }
    return Promise.resolve()
      // Inject
      .then(() => {
        if (self.options.inject) {
          return self.injectAssetsIntoHtml(html, assets, assetTags);
        } else {
          return html;
        }
      })
      // Minify
      .then(html => {
        if (self.options.minify) {
          const minify = require('html-minifier').minify;
          return minify(html, self.options.minify);
        }
        return html;
      });
  }

  /*
   * Pushes the content of the given filename to the compilation assets
   */
  addFileToAssets (filename, compilation) {
    filename = path.resolve(compilation.compiler.context, filename);
    return Promise.all([
      fsStatAsync(filename),
      fsReadFileAsync(filename)
    ])
    .then(([size, source]) => {
      return {
        size,
        source
      };
    })
    .catch(() => Promise.reject(new Error('HtmlWebpackPlugin: could not load file ' + filename)))
    .then(results => {
      const basename = path.basename(filename);
      if (compilation.fileDependencies.add) {
        compilation.fileDependencies.add(filename);
      } else {
        // Before Webpack 4 - fileDepenencies was an array
        compilation.fileDependencies.push(filename);
      }
      compilation.assets[basename] = {
        source: () => results.source,
        size: () => results.size.size
      };
      return basename;
    });
  }

  /**
   * Helper to sort chunks
   */
  sortChunks (chunks, sortMode, compilation) {
    // Custom function
    if (typeof sortMode === 'function') {
      return chunks.sort(sortMode);
    }
    // Check if the given sort mode is a valid chunkSorter sort mode
    if (typeof chunkSorter[sortMode] !== 'undefined') {
      return chunkSorter[sortMode](chunks, this.options, compilation);
    }
    throw new Error('"' + sortMode + '" is not a valid chunk sort mode');
  }

  /**
   * Return all chunks from the compilation result which match the exclude and include filters
   */
  filterChunks (chunks, includedChunks, excludedChunks) {
    return chunks.filter(chunk => {
      const chunkName = chunk.names[0];
      // This chunk doesn't have a name. This script can't handled it.
      if (chunkName === undefined) {
        return false;
      }
      // Skip if the chunk should be lazy loaded
      if (typeof chunk.isInitial === 'function') {
        if (!chunk.isInitial()) {
          return false;
        }
      } else if (!chunk.initial) {
        return false;
      }
      // Skip if the chunks should be filtered and the given chunk was not added explicity
      if (Array.isArray(includedChunks) && includedChunks.indexOf(chunkName) === -1) {
        return false;
      }
      // Skip if the chunks should be filtered and the given chunk was excluded explicity
      if (Array.isArray(excludedChunks) && excludedChunks.indexOf(chunkName) !== -1) {
        return false;
      }
      // Add otherwise
      return true;
    });
  }

  isHotUpdateCompilation (assets) {
    return assets.js.length && assets.js.every(name => /\.hot-update\.js$/.test(name));
  }

  htmlWebpackPluginAssets (compilation, chunks) {
    const self = this;
    const compilationHash = compilation.hash;

    // Use the configured public path or build a relative path
    let publicPath = typeof compilation.options.output.publicPath !== 'undefined'
      // If a hard coded public path exists use it
      ? compilation.mainTemplate.getPublicPath({hash: compilationHash})
      // If no public path was set get a relative url path
      : path.relative(path.resolve(compilation.options.output.path, path.dirname(self.childCompilationOutputName)), compilation.options.output.path)
        .split(path.sep).join('/');

    if (publicPath.length && publicPath.substr(-1, 1) !== '/') {
      publicPath += '/';
    }

    const assets = {
      // The public path
      publicPath: publicPath,
      // Will contain all js & css files by chunk
      chunks: {},
      // Will contain all js files
      js: [],
      // Will contain all css files
      css: [],
      // Will contain the html5 appcache manifest files if it exists
      manifest: Object.keys(compilation.assets).filter(assetFile => path.extname(assetFile) === '.appcache')[0]
    };

    // Append a hash for cache busting
    if (this.options.hash) {
      assets.manifest = self.appendHash(assets.manifest, compilationHash);
      assets.favicon = self.appendHash(assets.favicon, compilationHash);
    }

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkName = chunk.names[0];

      assets.chunks[chunkName] = {};

      // Prepend the public path to all chunk files
      let chunkFiles = [].concat(chunk.files).map(chunkFile => publicPath + chunkFile);

      // Append a hash for cache busting
      if (this.options.hash) {
        chunkFiles = chunkFiles.map(chunkFile => self.appendHash(chunkFile, compilationHash));
      }

      // Webpack outputs an array for each chunk when using sourcemaps
      // or when one chunk hosts js and css simultaneously
      const js = chunkFiles.find(chunkFile => /.js($|\?)/.test(chunkFile));
      if (js) {
        assets.chunks[chunkName].size = chunk.size;
        assets.chunks[chunkName].entry = js;
        assets.chunks[chunkName].hash = chunk.hash;
        assets.js.push(js);
      }

      // Gather all css files
      const css = chunkFiles.filter(chunkFile => /.css($|\?)/.test(chunkFile));
      assets.chunks[chunkName].css = css;
      assets.css = assets.css.concat(css);
    }

    // Duplicate css assets can occur on occasion if more than one chunk
    // requires the same css.
    assets.css = _.uniq(assets.css);

    return assets;
  }

  /**
   * Generate meta tags
   */
  getMetaTags () {
    if (this.options.meta === false) {
      return [];
    }
    // Make tags self-closing in case of xhtml
    // Turn { "viewport" : "width=500, initial-scale=1" } into
    // [{ name:"viewport" content:"width=500, initial-scale=1" }]
    const selfClosingTag = !!this.options.xhtml;
    const metaTagAttributeObjects = Object.keys(this.options.meta).map((metaName) => {
      const metaTagContent = this.options.meta[metaName];
      return (typeof metaTagContent === 'object') ? metaTagContent : {
        name: metaName,
        content: metaTagContent
      };
    });
    // Turn [{ name:"viewport" content:"width=500, initial-scale=1" }] into
    // the html-webpack-plugin tag structure
    return metaTagAttributeObjects.map((metaTagAttributes) => {
      return {
        tagName: 'meta',
        voidTag: true,
        selfClosingTag: selfClosingTag,
        attributes: metaTagAttributes
      };
    });
  }

  /**
   * Injects the assets into the given html string
   */
  generateHtmlTags (assets) {
    // Turn script files into script tags
    const scripts = assets.js.map(scriptPath => ({
      tagName: 'script',
      closeTag: true,
      attributes: {
        type: 'text/javascript',
        src: scriptPath
      }
    }));
    // Make tags self-closing in case of xhtml
    const selfClosingTag = !!this.options.xhtml;
    // Turn css files into link tags
    const styles = assets.css.map(stylePath => ({
      tagName: 'link',
      selfClosingTag: selfClosingTag,
      voidTag: true,
      attributes: {
        href: stylePath,
        rel: 'stylesheet'
      }
    }));
    // Injection targets
    let head = this.getMetaTags();
    let body = [];

    // If there is a favicon present, add it to the head
    if (assets.favicon) {
      head.push({
        tagName: 'link',
        selfClosingTag: selfClosingTag,
        voidTag: true,
        attributes: {
          rel: 'shortcut icon',
          href: assets.favicon
        }
      });
    }
    // Add styles to the head
    head = head.concat(styles);
    // Add scripts to body or head
    if (this.options.inject === 'head') {
      head = head.concat(scripts);
    } else {
      body = body.concat(scripts);
    }
    return {head: head, body: body};
  }

  /**
   * Injects the assets into the given html string
   */
  injectAssetsIntoHtml (html, assets, assetTags) {
    const htmlRegExp = /(<html[^>]*>)/i;
    const headRegExp = /(<\/head\s*>)/i;
    const bodyRegExp = /(<\/body\s*>)/i;
    const body = assetTags.body.map(this.createHtmlTag.bind(this));
    const head = assetTags.head.map(this.createHtmlTag.bind(this));

    if (body.length) {
      if (bodyRegExp.test(html)) {
        // Append assets to body element
        html = html.replace(bodyRegExp, match => body.join('') + match);
      } else {
        // Append scripts to the end of the file if no <body> element exists:
        html += body.join('');
      }
    }

    if (head.length) {
      // Create a head tag if none exists
      if (!headRegExp.test(html)) {
        if (!htmlRegExp.test(html)) {
          html = '<head></head>' + html;
        } else {
          html = html.replace(htmlRegExp, match => match + '<head></head>');
        }
      }

      // Append assets to head element
      html = html.replace(headRegExp, match => head.join('') + match);
    }

    // Inject manifest into the opening html tag
    if (assets.manifest) {
      html = html.replace(/(<html[^>]*)(>)/i, (match, start, end) => {
        // Append the manifest only if no manifest was specified
        if (/\smanifest\s*=/.test(match)) {
          return match;
        }
        return start + ' manifest="' + assets.manifest + '"' + end;
      });
    }
    return html;
  }

  /**
   * Appends a cache busting hash
   */
  appendHash (url, hash) {
    if (!url) {
      return url;
    }
    return url + (url.indexOf('?') === -1 ? '?' : '&') + hash;
  }

  /**
   * Turn a tag definition into a html string
   */
  createHtmlTag (tagDefinition) {
    const attributes = Object.keys(tagDefinition.attributes || {})
      .filter(attributeName => tagDefinition.attributes[attributeName] !== false)
      .map(attributeName => {
        if (tagDefinition.attributes[attributeName] === true) {
          return attributeName;
        }
        return attributeName + '="' + tagDefinition.attributes[attributeName] + '"';
      });
    // Backport of 3.x void tag definition
    const voidTag = tagDefinition.voidTag !== undefined ? tagDefinition.voidTag : !tagDefinition.closeTag;
    const selfClosingTag = tagDefinition.voidTag !== undefined ? tagDefinition.voidTag && this.options.xhtml : tagDefinition.selfClosingTag;
    return '<' + [tagDefinition.tagName].concat(attributes).join(' ') + (selfClosingTag ? '/' : '') + '>' +
      (tagDefinition.innerHTML || '') +
      (voidTag ? '' : '</' + tagDefinition.tagName + '>');
  }

  /**
   * Helper to return the absolute template path with a fallback loader
   */
  getFullTemplatePath (template, context) {
    // If the template doesn't use a loader use the lodash template loader
    if (template.indexOf('!') === -1) {
      template = require.resolve('./lib/loader.js') + '!' + path.resolve(context, template);
    }
    // Resolve template path
    return template.replace(
      /([!])([^/\\][^!?]+|[^/\\!?])($|\?[^!?\n]+$)/,
      (match, prefix, filepath, postfix) => prefix + path.resolve(filepath) + postfix);
  }

  /**
   * Helper to return a sorted unique array of all asset files out of the
   * asset object
   */
  getAssetFiles (assets) {
    const files = _.uniq(Object.keys(assets).filter(assetType => assetType !== 'chunks' && assets[assetType]).reduce((files, assetType) => files.concat(assets[assetType]), []));
    files.sort();
    return files;
  }

  /**
   * Helper to promisify compilation.applyPluginsAsyncWaterfall that returns
   * a function that helps to merge given plugin arguments with processed ones
   */
  applyPluginsAsyncWaterfall (compilation) {
    if (compilation.hooks) {
      return (eventName, requiresResult, pluginArgs) => {
        const ccEventName = trainCaseToCamelCase(eventName);
        if (!compilation.hooks[ccEventName]) {
          compilation.errors.push(
            new Error('No hook found for ' + eventName)
          );
        }

        return compilation.hooks[ccEventName].promise(pluginArgs);
      };
    }

    // Before Webpack 4
    const promisedApplyPluginsAsyncWaterfall = function (name, init) {
      return new Promise((resolve, reject) => {
        const callback = function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        };
        compilation.applyPluginsAsyncWaterfall(name, init, callback);
      });
    };

    return (eventName, requiresResult, pluginArgs) => promisedApplyPluginsAsyncWaterfall(eventName, pluginArgs)
      .then(result => {
        if (requiresResult && !result) {
          compilation.warnings.push(
            new Error('Using ' + eventName + ' without returning a result is deprecated.')
          );
        }
        return _.extend(pluginArgs, result);
      });
  }
}

/**
 * Takes a string in train case and transforms it to camel case
 *
 * Example: 'hello-my-world' to 'helloMyWorld'
 *
 * @param {string} word
 */
function trainCaseToCamelCase (word) {
  return word.replace(/-([\w])/g, (match, p1) => p1.toUpperCase());
}

/**
 * The default for options.templateParameter
 * Generate the template parameters
 */
function templateParametersGenerator (compilation, assets, options) {
  return {
    compilation: compilation,
    webpack: compilation.getStats().toJson(),
    webpackConfig: compilation.options,
    htmlWebpackPlugin: {
      files: assets,
      options: options
    }
  };
}

module.exports = HtmlWebpackPlugin;
