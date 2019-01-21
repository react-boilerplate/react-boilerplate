'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lessStringify;

var _lessStringifier = require('./less-stringifier');

var _lessStringifier2 = _interopRequireDefault(_lessStringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lessStringify(node, builder) {
  var str = new _lessStringifier2.default(builder);

  str.stringify(node);
}
module.exports = exports['default'];