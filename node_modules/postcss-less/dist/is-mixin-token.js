'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMixinToken;

var _globals = require('./tokenizer/globals');

var unpaddedFractionalNumbersPattern = /\.[0-9]/;

function isMixinToken(token) {
  var symbol = token[1];
  var firstSymbolCode = symbol ? symbol[0].charCodeAt(0) : null;

  return (firstSymbolCode === _globals.dot || firstSymbolCode === _globals.hash) &&
  // ignore hashes used for colors
  _globals.hashColorPattern.test(symbol) === false &&
  // ignore dots used for unpadded fractional numbers
  unpaddedFractionalNumbersPattern.test(symbol) === false;
}
module.exports = exports['default'];