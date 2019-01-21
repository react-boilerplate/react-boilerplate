'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormAsyncErrors = require('../selectors/getFormAsyncErrors');

var _getFormAsyncErrors2 = _interopRequireDefault(_getFormAsyncErrors);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormAsyncErrors2.default)(_immutable2.default);