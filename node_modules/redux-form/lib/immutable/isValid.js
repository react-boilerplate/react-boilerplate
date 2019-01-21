'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValid = require('../selectors/isValid');

var _isValid2 = _interopRequireDefault(_isValid);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isValid2.default)(_immutable2.default);