'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _neoAsync = require('neo-async');

var _neoAsync2 = _interopRequireDefault(_neoAsync);

var _RawSource = require('webpack-sources/lib/RawSource');

var _RawSource2 = _interopRequireDefault(_RawSource);

var _ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

var _ModuleFilenameHelpers2 = _interopRequireDefault(_ModuleFilenameHelpers);

var _cacache = require('cacache');

var _cacache2 = _interopRequireDefault(_cacache);

var _findCacheDir = require('find-cache-dir');

var _findCacheDir2 = _interopRequireDefault(_findCacheDir);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _schemaUtils = require('schema-utils');

var _schemaUtils2 = _interopRequireDefault(_schemaUtils);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _options = require('./options.json');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CompressionPlugin {
  constructor(options = {}) {
    (0, _schemaUtils2.default)(_options2.default, options, 'Compression Plugin');

    const {
      test,
      include,
      exclude,
      cache = false,
      algorithm = 'gzip',
      compressionOptions = {},
      filename = '[path].gz[query]',
      threshold = 0,
      minRatio = 0.8,
      deleteOriginalAssets = false
    } = options;

    this.options = {
      test,
      include,
      exclude,
      cache,
      algorithm,
      compressionOptions,
      filename,
      threshold,
      minRatio,
      deleteOriginalAssets
    };

    if (typeof algorithm === 'string') {
      // eslint-disable-next-line global-require
      const zlib = require('zlib');

      this.options.algorithm = zlib[this.options.algorithm];

      if (!this.options.algorithm) {
        throw new Error('Algorithm not found in zlib');
      }

      const defaultCompressionOptions = { level: 9 };

      this.options.compressionOptions = Object.assign({}, defaultCompressionOptions, this.options.compressionOptions);
    }
  }

  apply(compiler) {
    const emit = (compilation, callback) => {
      const {
        cache,
        threshold,
        minRatio,
        filename,
        deleteOriginalAssets
      } = this.options;
      const cacheDir = cache === true ? (0, _findCacheDir2.default)({ name: 'compression-webpack-plugin' }) : cache;
      const { assets } = compilation;

      // eslint-disable-next-line consistent-return
      _neoAsync2.default.forEach(Object.keys(assets), (file, cb) => {
        if (!_ModuleFilenameHelpers2.default.matchObject(this.options, file)) {
          return cb();
        }

        const asset = assets[file];
        let input = asset.source();

        if (!Buffer.isBuffer(input)) {
          input = Buffer.from(input);
        }

        const originalSize = input.length;

        if (originalSize < threshold) {
          return cb();
        }

        return Promise.resolve().then(() => {
          if (cache) {
            const { outputPath } = compiler;
            const cacheKey = (0, _serializeJavascript2.default)({
              // Invalidate cache after upgrade `zlib` module (build-in in `nodejs`)
              node: process.version,
              'compression-webpack-plugin': _package2.default.version,
              'compression-webpack-plugin-options': this.options,
              path: `${outputPath ? `${outputPath}/` : ''}${file}`,
              hash: _crypto2.default.createHash('md4').update(input).digest('hex')
            });

            return _cacache2.default.get(cacheDir, cacheKey).then(result => result.data, () => Promise.resolve().then(() => this.compress(input)).then(data => _cacache2.default.put(cacheDir, cacheKey, data).then(() => data)));
          }

          return this.compress(input);
        }).then(result => {
          if (result.length / originalSize > minRatio) {
            return cb();
          }

          const parse = _url2.default.parse(file);
          const info = {
            file,
            path: parse.pathname,
            query: parse.query ? `?${parse.query}` : ''
          };

          const newAssetName = typeof filename === 'function' ? filename(info) : filename.replace(/\[(file|path|query)\]/g, (p0, p1) => info[p1]);

          assets[newAssetName] = new _RawSource2.default(result);

          if (deleteOriginalAssets) {
            delete assets[file];
          }

          return cb();
        }).catch(error => {
          compilation.errors.push(error);

          return cb();
        });
      }, callback);
    };

    compiler.hooks.emit.tapAsync({ name: 'CompressionPlugin' }, emit);
  }

  compress(input) {
    return new Promise((resolve, reject) => {
      const { algorithm, compressionOptions } = this.options;

      algorithm(input, compressionOptions, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      });
    });
  }
} /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  */

exports.default = CompressionPlugin;