'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findEndOfEscaping;

var _globals = require('./globals');

/**
 * @param state
 * @returns {number}
 */
function findEndOfEscaping(state) {
  var openQuotesCount = 0,
      quoteCode = -1;

  for (var i = state.pos + 1; i < state.length; i++) {
    var symbolCode = state.css.charCodeAt(i);
    var prevSymbolCode = state.css.charCodeAt(i - 1);

    if (prevSymbolCode !== _globals.backslash && (symbolCode === _globals.singleQuote || symbolCode === _globals.doubleQuote || symbolCode === _globals.backTick)) {
      if (quoteCode === -1) {
        quoteCode = symbolCode;
        openQuotesCount++;
      } else if (symbolCode === quoteCode) {
        openQuotesCount--;

        if (!openQuotesCount) {
          return i;
        }
      }
    }
  }

  return -1;
}
module.exports = exports['default'];