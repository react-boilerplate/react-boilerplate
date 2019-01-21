'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _ajvKeywords = require('ajv-keywords');

var _ajvKeywords2 = _interopRequireDefault(_ajvKeywords);

var _ValidationError = require('./ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajv = new _ajv2.default({
  allErrors: true,
  useDefaults: true,
  errorDataPath: 'property'
});

(0, _ajvKeywords2.default)(ajv, ['instanceof', 'typeof']);

var validateOptions = function validateOptions(schema, options, name) {
  if (typeof schema === 'string') {
    schema = _fs2.default.readFileSync(_path2.default.resolve(schema), 'utf8');
    schema = JSON.parse(schema);
  }

  if (!ajv.validate(schema, options)) {
    throw new _ValidationError2.default(ajv.errors, name);
  }

  return true;
};

exports.default = validateOptions;