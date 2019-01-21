'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lessTokenize;

var _globals = require('./tokenizer/globals');

var _tokenizeSymbol = require('./tokenizer/tokenize-symbol');

var _tokenizeSymbol2 = _interopRequireDefault(_tokenizeSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lessTokenize(input) {
  var state = {
    input: input,
    tokens: [],
    css: input.css.valueOf(),
    offset: -1,
    line: 1,
    pos: 0
  };

  state.length = state.css.length;

  while (state.pos < state.length) {
    state.symbolCode = state.css.charCodeAt(state.pos);
    state.symbol = state.css[state.pos];
    state.nextPos = null;
    state.escaped = null;
    state.lines = null;
    state.lastLine = null;
    state.cssPart = null;
    state.escape = null;
    state.nextLine = null;
    state.nextOffset = null;
    state.escapePos = null;
    state.token = null;

    if (state.symbolCode === _globals.newline) {
      state.offset = state.pos;
      state.line += 1;
    }

    (0, _tokenizeSymbol2.default)(state);

    state.pos++;
  }

  return state.tokens;
}
module.exports = exports['default'];