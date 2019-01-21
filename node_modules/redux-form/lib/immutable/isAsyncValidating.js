'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isAsyncValidating = require('../selectors/isAsyncValidating');

var _isAsyncValidating2 = _interopRequireDefault(_isAsyncValidating);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isAsyncValidating2.default)(_immutable2.default);