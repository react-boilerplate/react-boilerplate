"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeBasicSymbol;
function tokenizeBasicSymbol(state) {
  state.tokens.push([state.symbol, state.symbol, state.line, state.pos - state.offset]);
}
module.exports = exports["default"];