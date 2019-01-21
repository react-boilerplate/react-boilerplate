'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPristine = require('../selectors/isPristine');

var _isPristine2 = _interopRequireDefault(_isPristine);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isPristine2.default)(_immutable2.default);