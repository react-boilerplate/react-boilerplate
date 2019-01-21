'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _webpackLibSingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

var _webpackLibSingleEntryPlugin2 = _interopRequireDefault(_webpackLibSingleEntryPlugin);

var _miscGetUglifyPlugin = require('./misc/get-uglify-plugin');

var _miscGetUglifyPlugin2 = _interopRequireDefault(_miscGetUglifyPlugin);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _deepExtend = require('deep-extend');

var _deepExtend2 = _interopRequireDefault(_deepExtend);

var _miscUtils = require('./misc/utils');

var ServiceWorker = (function () {
  function ServiceWorker(options) {
    _classCallCheck(this, ServiceWorker);

    if ((0, _miscUtils.isAbsolutePath)(options.output)) {
      throw new Error('OfflinePlugin: ServiceWorker.output option must be a relative path, ' + 'but an absolute path was passed');
    }

    this.minify = options.minify;
    this.output = options.output.replace(/^\.\/+/, '');
    this.publicPath = options.publicPath;

    this.basePath = null;
    this.location = null;
    this.pathRewrite = null;

    // Tool specific properties
    this.entry = options.entry;
    this.scope = options.scope ? options.scope + '' : void 0;
    this.events = !!options.events;
    this.prefetchRequest = this.validatePrefetch(options.prefetchRequest);
    this.updateViaCache = (options.updateViaCache || '') + '';
    this.navigationPreload = options.navigationPreload;
    this.forceInstall = !!options.forceInstall;

    var cacheNameQualifier = '';

    if (options.cacheName) {
      cacheNameQualifier = ':' + options.cacheName;
    }

    this.ENTRY_NAME = 'serviceworker';
    this.CACHE_NAME = 'webpack-offline' + cacheNameQualifier;
    this.SW_DATA_VAR = '__wpo';
  }

  _createClass(ServiceWorker, [{
    key: 'addEntry',
    value: function addEntry(plugin, compilation, compiler) {
      if (!this.entry) return Promise.resolve();

      var name = plugin.entryPrefix + this.ENTRY_NAME;
      var childCompiler = compilation.createChildCompiler(name, {
        // filename: this.output
        filename: name
      });

      var data = JSON.stringify({
        data_var_name: this.SW_DATA_VAR,
        cacheMaps: plugin.cacheMaps,
        navigationPreload: this.stringifyNavigationPreload(this.navigationPreload, plugin)
      });

      var swLoaderPath = _path2['default'].join(__dirname, 'misc/sw-loader.js');
      var loader = '!!' + swLoaderPath + '?json=' + escape(data);
      var entry = loader + '!' + this.entry;

      childCompiler.context = compiler.context;
      new _webpackLibSingleEntryPlugin2['default'](compiler.context, entry, name).apply(childCompiler);

      var optimization = compiler.options.optimization || {};

      var uglifyOptions = {
        compress: {
          warnings: false,
          dead_code: true,
          drop_console: true,
          unused: true
        },

        output: {
          comments: false
        }
      };

      if (this.minify === true) {
        if (!_miscGetUglifyPlugin2['default']) {
          throw new Error('OfflinePlugin: uglifyjs-webpack-plugin is required to preform a minification');
        }

        var options = {
          test: new RegExp(name),
          uglifyOptions: uglifyOptions
        };

        new _miscGetUglifyPlugin2['default'](options).apply(childCompiler);
      } else if ((this.minify !== false || optimization.minimize) && _miscGetUglifyPlugin2['default']) {
        // Do not perform auto-minification if UglifyJsPlugin isn't installed

        var added = (optimization.minimize && optimization.minimizer || []).concat(compiler.options.plugins || []).some(function (plugin) {
          if (plugin instanceof _miscGetUglifyPlugin2['default']) {
            var options = (0, _deepExtend2['default'])({}, plugin.options);

            options.test = new RegExp(name);
            new _miscGetUglifyPlugin2['default'](options).apply(childCompiler);

            return true;
          }
        });

        if (!added && optimization.minimize) {
          var options = {
            test: new RegExp(name),
            uglifyOptions: uglifyOptions
          };

          new _miscGetUglifyPlugin2['default'](options).apply(childCompiler);
        }
      }

      // Needed for HMR. offline-plugin doesn't support it,
      // but added just in case to prevent other errors
      var compilationFn = function compilationFn(compilation) {
        if (compilation.cache) {
          if (!compilation.cache[name]) {
            compilation.cache[name] = {};
          }

          compilation.cache = compilation.cache[name];
        }
      };

      if (childCompiler.hooks) {
        var _plugin = { name: 'OfflinePlugin' };
        childCompiler.hooks.compilation.tap(_plugin, compilationFn);
      } else {
        childCompiler.plugin('compilation', compilationFn);
      }

      return new Promise(function (resolve, reject) {
        childCompiler.runAsChild(function (err, entries, childCompilation) {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
      });
    }
  }, {
    key: 'apply',
    value: function apply(plugin, compilation, compiler) {
      var minify = undefined;

      if (typeof this.minify === 'boolean') {
        minify = this.minify;
      } else {
        minify = !!_miscGetUglifyPlugin2['default'] && (!!(compiler.options.optimization && compiler.options.optimization.minimize) || !!(compiler.options.plugins || []).some(function (plugin) {
          return plugin instanceof _miscGetUglifyPlugin2['default'];
        }));
      }

      var source = this.getDataTemplate(plugin.caches, plugin, minify);

      if (this.entry) {
        var _name = plugin.entryPrefix + this.ENTRY_NAME;
        var asset = compilation.assets[_name];

        if (!asset) {
          compilation.errors.push(new Error('OfflinePlugin: ServiceWorker entry is not found in output assets'));

          return;
        }

        delete compilation.assets[_name];

        if (!plugin.__tests.swMetadataOnly) {
          source += '\n\n' + asset.source();
        }
      }

      compilation.assets[this.output] = (0, _miscUtils.getSource)(source);
    }
  }, {
    key: 'getDataTemplate',
    value: function getDataTemplate(data, plugin, minify) {
      var rewriteFunction = this.pathRewrite;

      var cache = function cache(key) {
        return (data[key] || []).map(rewriteFunction);
      };

      var hashesMap = Object.keys(plugin.hashesMap).reduce(function (result, hash) {
        var asset = plugin.hashesMap[hash];

        result[hash] = rewriteFunction(asset);
        return result;
      }, {});

      var externals = plugin.externals.map(rewriteFunction);

      var pluginVersion = undefined;

      if (plugin.pluginVersion && !plugin.__tests.noVersionDump) {
        pluginVersion = plugin.pluginVersion;
      }

      return ('\n      var ' + this.SW_DATA_VAR + ' = ' + JSON.stringify({
        assets: {
          main: cache('main'),
          additional: cache('additional'),
          optional: cache('optional')
        },

        externals: externals,

        hashesMap: hashesMap,

        strategy: plugin.strategy,
        responseStrategy: plugin.responseStrategy,
        version: plugin.version,
        name: this.CACHE_NAME,
        pluginVersion: pluginVersion,
        relativePaths: plugin.relativePaths,

        prefetchRequest: this.prefetchRequest,

        // These aren't added
        alwaysRevalidate: plugin.alwaysRevalidate,
        preferOnline: plugin.preferOnline,
        ignoreSearch: plugin.ignoreSearch
      }, null, minify ? void 0 : '  ') + ';\n    ').trim();
    }
  }, {
    key: 'getConfig',
    value: function getConfig(plugin) {
      return {
        location: this.location,
        scope: this.scope,
        updateViaCache: this.updateViaCache,
        events: this.events,
        force: this.forceInstall
      };
    }
  }, {
    key: 'validatePrefetch',
    value: function validatePrefetch(request) {
      if (!request) {
        return void 0;
      }

      if (request.credentials === 'same-origin' && request.headers === void 0 && request.mode === 'cors' && request.cache === void 0) {
        return void 0;
      }

      return {
        credentials: request.credentials,
        headers: request.headers,
        mode: request.mode,
        cache: request.cache
      };
    }
  }, {
    key: 'stringifyNavigationPreload',
    value: function stringifyNavigationPreload(navigationPreload, plugin) {
      var result = undefined;

      if (typeof navigationPreload === 'object') {
        result = navigationPreload = '{\n        map: ' + (0, _miscUtils.functionToString)(navigationPreload.map) + ',\n        test: ' + (0, _miscUtils.functionToString)(navigationPreload.test) + '\n      }';
      } else {
        if (typeof navigationPreload !== 'boolean') {
          if (plugin.responseStrategy === 'network-first') {
            navigationPreload = true;
          } else {
            navigationPreload = false;
          }
        }

        result = JSON.stringify(navigationPreload);
      }

      return result;
    }
  }]);

  return ServiceWorker;
})();

exports['default'] = ServiceWorker;
module.exports = exports['default'];