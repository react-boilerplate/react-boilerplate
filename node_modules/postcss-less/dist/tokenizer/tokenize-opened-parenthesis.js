'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeOpenedParenthesis;

var _globals = require('./globals');

var _unclosed = require('./unclosed');

var _unclosed2 = _interopRequireDefault(_unclosed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findClosedParenthesisPosition(css, length, start) {
  var openedParenthesisCount = 0;

  for (var i = start; i < length; i++) {
    var symbol = css[i];

    if (symbol === '(') {
      openedParenthesisCount++;
    } else if (symbol === ')') {
      openedParenthesisCount--;

      if (!openedParenthesisCount) {
        return i;
      }
    }
  }

  return -1;
}

// it is not very reasonable to reduce complexity beyond this level
// eslint-disable-next-line complexity
function tokenizeOpenedParenthesis(state) {
  var nextSymbolCode = state.css.charCodeAt(state.pos + 1);
  var tokensCount = state.tokens.length;
  var prevTokenCssPart = tokensCount ? state.tokens[tokensCount - 1][1] : '';

  if (prevTokenCssPart === 'url' && nextSymbolCode !== _globals.singleQuote && nextSymbolCode !== _globals.doubleQuote && nextSymbolCode !== _globals.space && nextSymbolCode !== _globals.newline && nextSymbolCode !== _globals.tab && nextSymbolCode !== _globals.feed && nextSymbolCode !== _globals.carriageReturn) {
    state.nextPos = state.pos;

    do {
      state.escaped = false;
      state.nextPos = state.css.indexOf(')', state.nextPos + 1);

      if (state.nextPos === -1) {
        (0, _unclosed2.default)(state, 'bracket');
      }

      state.escapePos = state.nextPos;

      while (state.css.charCodeAt(state.escapePos - 1) === _globals.backslash) {
        state.escapePos -= 1;
        state.escaped = !state.escaped;
      }
    } while (state.escaped);

    state.tokens.push(['brackets', state.css.slice(state.pos, state.nextPos + 1), state.line, state.pos - state.offset, state.line, state.nextPos - state.offset]);
    state.pos = state.nextPos;
  } else {
    state.nextPos = findClosedParenthesisPosition(state.css, state.length, state.pos);
    state.cssPart = state.css.slice(state.pos, state.nextPos + 1);

    var foundParam = state.cssPart.indexOf('@') >= 0;
    var foundString = /['"]/.test(state.cssPart);

    if (state.cssPart.length === 0 || state.cssPart === '...' || foundParam && !foundString) {
      // we're dealing with a mixin param block
      if (state.nextPos === -1) {
        (0, _unclosed2.default)(state, 'bracket');
      }

      state.tokens.push([state.symbol, state.symbol, state.line, state.pos - state.offset]);
    } else {
      var badBracket = _globals.badBracketPattern.test(state.cssPart);

      if (state.nextPos === -1 || badBracket) {
        state.tokens.push([state.symbol, state.symbol, state.line, state.pos - state.offset]);
      } else {
        state.tokens.push(['brackets', state.cssPart, state.line, state.pos - state.offset, state.line, state.nextPos - state.offset]);
        state.pos = state.nextPos;
      }
    }
  }
}
module.exports = exports['default'];