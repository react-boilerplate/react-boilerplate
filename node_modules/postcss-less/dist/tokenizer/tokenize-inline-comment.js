'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeInlineComment;
function tokenizeInlineComment(state) {
  state.nextPos = state.css.indexOf('\n', state.pos + 2) - 1;

  if (state.nextPos === -2) {
    state.nextPos = state.css.length - 1;
  }

  state.tokens.push(['comment', state.css.slice(state.pos, state.nextPos + 1), state.line, state.pos - state.offset, state.line, state.nextPos - state.offset, 'inline']);

  state.pos = state.nextPos;
}
module.exports = exports['default'];