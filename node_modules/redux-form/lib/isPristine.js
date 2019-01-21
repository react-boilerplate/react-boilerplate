'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPristine = require('./selectors/isPristine');

var _isPristine2 = _interopRequireDefault(_isPristine);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isPristine2.default)(_plain2.default);