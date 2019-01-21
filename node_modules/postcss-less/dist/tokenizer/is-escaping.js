'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEscaping;

var _globals = require('./globals');

var nextSymbolVariants = [_globals.backTick, _globals.doubleQuote, _globals.singleQuote];

function isEscaping(state) {
  var nextSymbolCode = state.css.charCodeAt(state.pos + 1);

  return state.symbolCode === _globals.tilde && nextSymbolVariants.indexOf(nextSymbolCode) >= 0;
}
module.exports = exports['default'];