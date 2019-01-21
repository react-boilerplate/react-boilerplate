'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormSubmitErrors = require('./selectors/getFormSubmitErrors');

var _getFormSubmitErrors2 = _interopRequireDefault(_getFormSubmitErrors);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormSubmitErrors2.default)(_plain2.default);