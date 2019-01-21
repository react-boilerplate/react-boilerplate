'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeQuotes;

var _globals = require('./globals');

var _unclosed = require('./unclosed');

var _unclosed2 = _interopRequireDefault(_unclosed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenizeQuotes(state) {
  state.nextPos = state.pos;

  do {
    state.escaped = false;
    state.nextPos = state.css.indexOf(state.symbol, state.nextPos + 1);

    if (state.nextPos === -1) {
      (0, _unclosed2.default)(state, 'quote');
    }

    state.escapePos = state.nextPos;

    while (state.css.charCodeAt(state.escapePos - 1) === _globals.backslash) {
      state.escapePos -= 1;
      state.escaped = !state.escaped;
    }
  } while (state.escaped);

  state.tokens.push(['string', state.css.slice(state.pos, state.nextPos + 1), state.line, state.pos - state.offset, state.line, state.nextPos - state.offset]);

  state.pos = state.nextPos;
}
module.exports = exports['default'];