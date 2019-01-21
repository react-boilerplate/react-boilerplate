'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormAsyncErrors = require('./selectors/getFormAsyncErrors');

var _getFormAsyncErrors2 = _interopRequireDefault(_getFormAsyncErrors);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormAsyncErrors2.default)(_plain2.default);