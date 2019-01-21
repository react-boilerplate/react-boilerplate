'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeWhitespace;

var _globals = require('./globals');

function tokenizeWhitespace(state) {
  state.nextPos = state.pos;

  // collect all neighbour space symbols
  do {
    state.nextPos += 1;
    state.symbolCode = state.css.charCodeAt(state.nextPos);
    if (state.symbolCode === _globals.newline) {
      state.offset = state.nextPos;
      state.line += 1;
    }
  } while (state.symbolCode === _globals.space || state.symbolCode === _globals.newline || state.symbolCode === _globals.tab || state.symbolCode === _globals.carriageReturn || state.symbolCode === _globals.feed);

  state.tokens.push(['space', state.css.slice(state.pos, state.nextPos)]);
  state.pos = state.nextPos - 1;
}
module.exports = exports['default'];