'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lessParse = require('./less-parse');

var _lessParse2 = _interopRequireDefault(_lessParse);

var _lessStringify = require('./less-stringify');

var _lessStringify2 = _interopRequireDefault(_lessStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { parse: _lessParse2.default, stringify: _lessStringify2.default };
module.exports = exports['default'];