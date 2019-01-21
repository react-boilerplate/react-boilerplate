'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _options = require('../../utils/options');

var _preprocess = require('./preprocess');

var _preprocess2 = _interopRequireDefault(_preprocess);

var _transpile = require('./transpile');

var _transpile2 = _interopRequireDefault(_transpile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (path, state) {
  // We can only do one or the other, but preprocessing
  // disables the normal transpilation, obviously
  if ((0, _options.useCSSPreprocessor)(state)) {
    (0, _preprocess2.default)(path, state);
  } else if ((0, _options.useTranspileTemplateLiterals)(state)) {
    (0, _transpile2.default)(path, state);
  }
};