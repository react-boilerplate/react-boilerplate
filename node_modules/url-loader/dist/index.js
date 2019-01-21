'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = undefined;
exports.default = loader;

var _loaderUtils = require('loader-utils');

var _schemaUtils = require('schema-utils');

var _schemaUtils2 = _interopRequireDefault(_schemaUtils);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var _options = require('./options.json');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Loader Mode
/* eslint-disable
  global-require,
  no-param-reassign,
  prefer-destructuring,
  import/no-dynamic-require,
*/
const raw = exports.raw = true;

function loader(src) {
  // Loader Options
  const options = (0, _loaderUtils.getOptions)(this) || {};

  (0, _schemaUtils2.default)(_options2.default, options, 'URL Loader');

  const file = this.resourcePath;
  // Set limit for resource inlining (file size)
  let limit = options.limit;

  if (limit) {
    limit = parseInt(limit, 10);
  }
  // Get MIME type
  const mimetype = options.mimetype || _mime2.default.getType(file);

  // No limit or within the specified limit
  if (!limit || src.length < limit) {
    if (typeof src === 'string') {
      src = Buffer.from(src);
    }

    return `module.exports = ${JSON.stringify(`data:${mimetype || ''};base64,${src.toString('base64')}`)}`;
  }

  const fallback = require(options.fallback ? options.fallback : 'file-loader');

  return fallback.call(this, src);
}