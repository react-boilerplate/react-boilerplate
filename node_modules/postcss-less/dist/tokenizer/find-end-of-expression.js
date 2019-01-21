'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findEndOfExpression;

var _globals = require('./globals');

function findEndOfExpression(css, length, i) {
  var openedParenthesisBlocks = 0,
      openedCurlyBlocks = 0;

  for (; i < length; ++i) {
    var symbolCode = css[i].charCodeAt(0);

    // find the on of escaped expression
    if (!openedParenthesisBlocks && !openedCurlyBlocks && (symbolCode === _globals.semicolon || symbolCode === _globals.closedCurlyBracket)) {
      return i - 1;
    }

    switch (symbolCode) {
      case _globals.openedCurlyBracket:
        openedCurlyBlocks++;
        break;

      case _globals.closedCurlyBracket:
        openedCurlyBlocks--;
        break;

      case _globals.openedParenthesis:
        openedParenthesisBlocks++;
        break;

      case _globals.closedParenthesis:
        openedParenthesisBlocks--;
        break;

      default:
        break;
    }
  }

  return -1;
}
module.exports = exports['default'];