'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeMultilineComment;

var _unclosed = require('./unclosed');

var _unclosed2 = _interopRequireDefault(_unclosed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenizeMultilineComment(state) {
  state.nextPos = state.css.indexOf('*/', state.pos + 2) + 1;

  if (state.nextPos === 0) {
    (0, _unclosed2.default)(state, 'comment');
  }

  state.cssPart = state.css.slice(state.pos, state.nextPos + 1);
  state.lines = state.cssPart.split('\n');
  state.lastLine = state.lines.length - 1;

  if (state.lastLine > 0) {
    state.nextLine = state.line + state.lastLine;
    state.nextOffset = state.nextPos - state.lines[state.lastLine].length;
  } else {
    state.nextLine = state.line;
    state.nextOffset = state.offset;
  }

  state.tokens.push(['comment', state.cssPart, state.line, state.pos - state.offset, state.nextLine, state.nextPos - state.nextOffset]);

  state.offset = state.nextOffset;
  state.line = state.nextLine;
  state.pos = state.nextPos;
}
module.exports = exports['default'];