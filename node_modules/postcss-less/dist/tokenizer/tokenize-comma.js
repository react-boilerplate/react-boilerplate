'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeComma;
function tokenizeComma(state) {
  state.tokens.push(['word', state.symbol, state.line, state.pos - state.offset, state.line, state.pos - state.offset + 1]);
}
module.exports = exports['default'];