'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       no-param-reassign
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourceMap = require('source-map');

var _webpackSources = require('webpack-sources');

var _RequestShortener = require('webpack/lib/RequestShortener');

var _RequestShortener2 = _interopRequireDefault(_RequestShortener);

var _ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

var _ModuleFilenameHelpers2 = _interopRequireDefault(_ModuleFilenameHelpers);

var _schemaUtils = require('schema-utils');

var _schemaUtils2 = _interopRequireDefault(_schemaUtils);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _options = require('./options.json');

var _options2 = _interopRequireDefault(_options);

var _uglify = require('./uglify');

var _uglify2 = _interopRequireDefault(_uglify);

var _versions = require('./uglify/versions');

var _versions2 = _interopRequireDefault(_versions);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var warningRegex = /\[.+:([0-9]+),([0-9]+)\]/;

var UglifyJsPlugin = function () {
  function UglifyJsPlugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UglifyJsPlugin);

    (0, _schemaUtils2.default)(_options2.default, options, 'UglifyJs Plugin');

    var _options$uglifyOption = options.uglifyOptions,
        uglifyOptions = _options$uglifyOption === undefined ? {} : _options$uglifyOption,
        _options$test = options.test,
        test = _options$test === undefined ? /\.js(\?.*)?$/i : _options$test,
        _options$warningsFilt = options.warningsFilter,
        warningsFilter = _options$warningsFilt === undefined ? function () {
      return true;
    } : _options$warningsFilt,
        _options$extractComme = options.extractComments,
        extractComments = _options$extractComme === undefined ? false : _options$extractComme,
        _options$sourceMap = options.sourceMap,
        sourceMap = _options$sourceMap === undefined ? false : _options$sourceMap,
        _options$cache = options.cache,
        cache = _options$cache === undefined ? false : _options$cache,
        _options$parallel = options.parallel,
        parallel = _options$parallel === undefined ? false : _options$parallel,
        include = options.include,
        exclude = options.exclude;


    this.options = {
      test,
      warningsFilter,
      extractComments,
      sourceMap,
      cache,
      parallel,
      include,
      exclude,
      uglifyOptions: Object.assign({
        output: {
          comments: extractComments ? false : /^\**!|@preserve|@license|@cc_on/
        }
      }, uglifyOptions)
    };
    this.sourceMapsCache = new WeakMap();
  }

  _createClass(UglifyJsPlugin, [{
    key: 'buildError',
    value: function buildError(err, file, inputSourceMap, requestShortener) {
      // Handling error which should have line, col, filename and message
      if (err.line) {
        var sourceMapCacheKey = { file };
        var sourceMap = this.sourceMapsCache.get(sourceMapCacheKey);
        if (!sourceMap) {
          sourceMap = new _sourceMap.SourceMapConsumer(inputSourceMap);
          this.sourceMapsCache.set(sourceMapCacheKey, sourceMap);
        }
        var original = sourceMap && sourceMap.originalPositionFor({
          line: err.line,
          column: err.col
        });
        if (original && original.source) {
          return new Error(`${file} from UglifyJs\n${err.message} [${requestShortener.shorten(original.source)}:${original.line},${original.column}][${file}:${err.line},${err.col}]`);
        }
        return new Error(`${file} from UglifyJs\n${err.message} [${file}:${err.line},${err.col}]`);
      } else if (err.stack) {
        return new Error(`${file} from UglifyJs\n${err.stack}`);
      }
      return new Error(`${file} from UglifyJs\n${err.message}`);
    }
  }, {
    key: 'buildWarning',
    value: function buildWarning(warning, file, inputSourceMap, warningsFilter, requestShortener) {
      if (!file || !inputSourceMap) {
        return warning;
      }

      var sourceMapCacheKey = { file };

      var sourceMap = this.sourceMapsCache.get(sourceMapCacheKey);

      if (!sourceMap) {
        sourceMap = new _sourceMap.SourceMapConsumer(inputSourceMap);
        this.sourceMapsCache.set(sourceMapCacheKey, sourceMap);
      }

      var match = warningRegex.exec(warning);
      var line = +match[1];
      var column = +match[2];
      var original = sourceMap.originalPositionFor({
        line,
        column
      });

      var warningMessage = null;

      if (warningsFilter(original.source)) {
        warningMessage = warning.replace(warningRegex, '');

        if (original && original.source && original.source !== file) {
          warningMessage += `[${requestShortener.shorten(original.source)}:${original.line},${original.column}]`;
        }
      }

      return warningMessage;
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      var requestShortener = new _RequestShortener2.default(compiler.context);

      var buildModuleFn = function buildModuleFn(moduleArg) {
        // to get detailed location info about errors
        moduleArg.useSourceMap = true;
      };

      var optimizeFn = function optimizeFn(compilation, chunks, callback) {
        var uglify = new _uglify2.default({
          cache: _this.options.cache,
          parallel: _this.options.parallel
        });

        var uglifiedAssets = new WeakSet();
        var tasks = [];

        chunks.reduce(function (acc, chunk) {
          return acc.concat(chunk.files || []);
        }, []).concat(compilation.additionalChunkAssets || []).filter(_ModuleFilenameHelpers2.default.matchObject.bind(null, _this.options)).forEach(function (file) {
          var inputSourceMap = void 0;
          var asset = compilation.assets[file];
          if (uglifiedAssets.has(asset)) {
            return;
          }

          try {
            var input = void 0;

            if (_this.options.sourceMap && asset.sourceAndMap) {
              var _asset$sourceAndMap = asset.sourceAndMap(),
                  source = _asset$sourceAndMap.source,
                  map = _asset$sourceAndMap.map;

              input = source;

              if (_utils2.default.isSourceMap(map)) {
                inputSourceMap = map;
              } else {
                inputSourceMap = map;
                compilation.warnings.push(new Error(`${file} contain invalid source map`));
              }
            } else {
              input = asset.source();
              inputSourceMap = null;
            }

            // Handling comment extraction
            var commentsFile = false;
            if (_this.options.extractComments) {
              commentsFile = _this.options.extractComments.filename || `${file}.LICENSE`;
              if (typeof commentsFile === 'function') {
                commentsFile = commentsFile(file);
              }
            }

            var task = {
              file,
              input,
              inputSourceMap,
              commentsFile,
              extractComments: _this.options.extractComments,
              uglifyOptions: _this.options.uglifyOptions
            };

            if (_this.options.cache) {
              task.cacheKey = (0, _serializeJavascript2.default)({
                'uglify-es': _versions2.default.uglify,
                'uglifyjs-webpack-plugin': _versions2.default.plugin,
                'uglifyjs-webpack-plugin-options': _this.options,
                path: compiler.outputPath ? `${compiler.outputPath}/${file}` : file,
                hash: _crypto2.default.createHash('md4').update(input).digest('hex')
              });
            }

            tasks.push(task);
          } catch (error) {
            compilation.errors.push(_this.buildError(error, file, inputSourceMap, requestShortener));
          }
        });

        uglify.runTasks(tasks, function (tasksError, results) {
          if (tasksError) {
            compilation.errors.push(tasksError);
            return;
          }

          results.forEach(function (data, index) {
            var _tasks$index = tasks[index],
                file = _tasks$index.file,
                input = _tasks$index.input,
                inputSourceMap = _tasks$index.inputSourceMap,
                commentsFile = _tasks$index.commentsFile;
            var error = data.error,
                map = data.map,
                code = data.code,
                warnings = data.warnings,
                extractedComments = data.extractedComments;

            // Handling results
            // Error case: add errors, and go to next file

            if (error) {
              compilation.errors.push(_this.buildError(error, file, inputSourceMap, requestShortener));

              return;
            }

            var outputSource = void 0;
            if (map) {
              outputSource = new _webpackSources.SourceMapSource(code, file, JSON.parse(map), input, inputSourceMap);
            } else {
              outputSource = new _webpackSources.RawSource(code);
            }

            // Write extracted comments to commentsFile
            if (commentsFile && extractedComments.length > 0) {
              // Add a banner to the original file
              if (_this.options.extractComments.banner !== false) {
                var banner = _this.options.extractComments.banner || `For license information please see ${_path2.default.posix.basename(commentsFile)}`;

                if (typeof banner === 'function') {
                  banner = banner(commentsFile);
                }

                if (banner) {
                  outputSource = new _webpackSources.ConcatSource(`/*! ${banner} */\n`, outputSource);
                }
              }

              var commentsSource = new _webpackSources.RawSource(`${extractedComments.join('\n\n')}\n`);

              if (commentsFile in compilation.assets) {
                // commentsFile already exists, append new comments...
                if (compilation.assets[commentsFile] instanceof _webpackSources.ConcatSource) {
                  compilation.assets[commentsFile].add('\n');
                  compilation.assets[commentsFile].add(commentsSource);
                } else {
                  compilation.assets[commentsFile] = new _webpackSources.ConcatSource(compilation.assets[commentsFile], '\n', commentsSource);
                }
              } else {
                compilation.assets[commentsFile] = commentsSource;
              }
            }

            // Updating assets
            uglifiedAssets.add(compilation.assets[file] = outputSource);

            // Handling warnings
            if (warnings && warnings.length > 0) {
              warnings.forEach(function (warning) {
                var builtWarning = _this.buildWarning(warning, file, inputSourceMap, _this.options.warningsFilter, requestShortener);

                if (builtWarning) {
                  compilation.warnings.push(builtWarning);
                }
              });
            }
          });

          uglify.exit();

          callback();
        });
      };

      if (compiler.hooks) {
        var plugin = { name: 'UglifyJSPlugin' };

        compiler.hooks.compilation.tap(plugin, function (compilation) {
          if (_this.options.sourceMap) {
            compilation.hooks.buildModule.tap(plugin, buildModuleFn);
          }

          compilation.hooks.optimizeChunkAssets.tapAsync(plugin, optimizeFn.bind(_this, compilation));
        });
      } else {
        compiler.plugin('compilation', function (compilation) {
          if (_this.options.sourceMap) {
            compilation.plugin('build-module', buildModuleFn);
          }

          compilation.plugin('optimize-chunk-assets', optimizeFn.bind(_this, compilation));
        });
      }
    }
  }]);

  return UglifyJsPlugin;
}();

exports.default = UglifyJsPlugin;