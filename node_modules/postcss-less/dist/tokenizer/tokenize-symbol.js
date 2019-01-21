'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeSymbol;

var _globals = require('./globals');

var _tokenizeAtRule = require('./tokenize-at-rule');

var _tokenizeAtRule2 = _interopRequireDefault(_tokenizeAtRule);

var _tokenizeBackslash = require('./tokenize-backslash');

var _tokenizeBackslash2 = _interopRequireDefault(_tokenizeBackslash);

var _tokenizeBasicSymbol = require('./tokenize-basic-symbol');

var _tokenizeBasicSymbol2 = _interopRequireDefault(_tokenizeBasicSymbol);

var _tokenizeComma = require('./tokenize-comma');

var _tokenizeComma2 = _interopRequireDefault(_tokenizeComma);

var _tokenizeDefault = require('./tokenize-default');

var _tokenizeDefault2 = _interopRequireDefault(_tokenizeDefault);

var _tokenizeOpenedParenthesis = require('./tokenize-opened-parenthesis');

var _tokenizeOpenedParenthesis2 = _interopRequireDefault(_tokenizeOpenedParenthesis);

var _tokenizeQuotes = require('./tokenize-quotes');

var _tokenizeQuotes2 = _interopRequireDefault(_tokenizeQuotes);

var _tokenizeWhitespace = require('./tokenize-whitespace');

var _tokenizeWhitespace2 = _interopRequireDefault(_tokenizeWhitespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// we cannot reduce complexity beyond this level
// eslint-disable-next-line complexity
function tokenizeSymbol(state) {
  switch (state.symbolCode) {
    case _globals.newline:
    case _globals.space:
    case _globals.tab:
    case _globals.carriageReturn:
    case _globals.feed:
      (0, _tokenizeWhitespace2.default)(state);
      break;

    case _globals.comma:
      (0, _tokenizeComma2.default)(state);
      break;

    case _globals.colon:
    case _globals.semicolon:
    case _globals.openedCurlyBracket:
    case _globals.closedCurlyBracket:
    case _globals.closedParenthesis:
    case _globals.openSquareBracket:
    case _globals.closeSquareBracket:
      (0, _tokenizeBasicSymbol2.default)(state);
      break;

    case _globals.openedParenthesis:
      (0, _tokenizeOpenedParenthesis2.default)(state);
      break;

    case _globals.singleQuote:
    case _globals.doubleQuote:
      (0, _tokenizeQuotes2.default)(state);
      break;

    case _globals.atRule:
      (0, _tokenizeAtRule2.default)(state);
      break;

    case _globals.backslash:
      (0, _tokenizeBackslash2.default)(state);
      break;

    default:
      (0, _tokenizeDefault2.default)(state);
      break;
  }
}
module.exports = exports['default'];