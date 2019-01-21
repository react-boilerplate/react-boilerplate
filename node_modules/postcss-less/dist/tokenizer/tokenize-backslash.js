'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeBackslash;

var _globals = require('./globals');

function tokenizeBackslash(state) {
  state.nextPos = state.pos;
  state.escape = true;

  while (state.css.charCodeAt(state.nextPos + 1) === _globals.backslash) {
    state.nextPos += 1;
    state.escape = !state.escape;
  }

  state.symbolCode = state.css.charCodeAt(state.nextPos + 1);

  if (state.escape && state.symbolCode !== _globals.slash && state.symbolCode !== _globals.space && state.symbolCode !== _globals.newline && state.symbolCode !== _globals.tab && state.symbolCode !== _globals.carriageReturn && state.symbolCode !== _globals.feed) {
    state.nextPos += 1;
  }

  state.tokens.push(['word', state.css.slice(state.pos, state.nextPos + 1), state.line, state.pos - state.offset, state.line, state.nextPos - state.offset]);

  state.pos = state.nextPos;
}
module.exports = exports['default'];