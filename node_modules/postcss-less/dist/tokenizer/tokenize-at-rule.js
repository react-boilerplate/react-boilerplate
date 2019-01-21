'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeAtRule;

var _globals = require('./globals');

var _unclosed = require('./unclosed');

var _unclosed2 = _interopRequireDefault(_unclosed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenizeAtRule(state) {
  // it's an interpolation
  if (state.css.charCodeAt(state.pos + 1) === _globals.openedCurlyBracket) {
    state.nextPos = state.css.indexOf('}', state.pos + 2);

    if (state.nextPos === -1) {
      (0, _unclosed2.default)(state, 'interpolation');
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

    state.tokens.push(['word', state.cssPart, state.line, state.pos - state.offset, state.nextLine, state.nextPos - state.nextOffset]);

    state.offset = state.nextOffset;
    state.line = state.nextLine;
  } else {
    _globals.atEndPattern.lastIndex = state.pos + 1;
    _globals.atEndPattern.test(state.css);

    if (_globals.atEndPattern.lastIndex === 0) {
      state.nextPos = state.css.length - 1;
    } else {
      // the first condition below is special for variable in less
      // some one may write code like `@testVar   :  #fff`
      // we should detect this kind of existence.
      var rest = state.css.slice(_globals.atEndPattern.lastIndex);
      var potentialPageRule = state.css.slice(state.pos, _globals.atEndPattern.lastIndex + 1);

      // we have to handle special selector like `@page :left`
      if (_globals.variableSpaceColonPattern.test(rest) && !_globals.pageSelectorPattern.test(potentialPageRule)) {
        state.nextPos = _globals.atEndPattern.lastIndex + rest.search(':');
      } else {
        state.nextPos = _globals.atEndPattern.lastIndex - 2;
      }
    }

    state.cssPart = state.css.slice(state.pos, state.nextPos + 1);
    state.token = 'at-word';

    // check if it's a variable
    if (_globals.variablePattern.test(state.cssPart)) {
      _globals.wordEndPattern.lastIndex = state.pos + 1;
      _globals.wordEndPattern.test(state.css);
      if (_globals.wordEndPattern.lastIndex === 0) {
        state.nextPos = state.css.length - 1;
      } else {
        state.nextPos = _globals.wordEndPattern.lastIndex - 2;
      }

      state.cssPart = state.css.slice(state.pos, state.nextPos + 1);
      state.token = 'word';
    }

    state.tokens.push([state.token, state.cssPart, state.line, state.pos - state.offset, state.line, state.nextPos - state.offset]);
  }

  state.pos = state.nextPos;
}
module.exports = exports['default'];