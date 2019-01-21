'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenizeDefault;

var _globals = require('./globals');

var _findEndOfEscaping = require('./find-end-of-escaping');

var _findEndOfEscaping2 = _interopRequireDefault(_findEndOfEscaping);

var _isEscaping = require('./is-escaping');

var _isEscaping2 = _interopRequireDefault(_isEscaping);

var _tokenizeInlineComment = require('./tokenize-inline-comment');

var _tokenizeInlineComment2 = _interopRequireDefault(_tokenizeInlineComment);

var _tokenizeMultilineComment = require('./tokenize-multiline-comment');

var _tokenizeMultilineComment2 = _interopRequireDefault(_tokenizeMultilineComment);

var _unclosed = require('./unclosed');

var _unclosed2 = _interopRequireDefault(_unclosed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenizeDefault(state) {
  var nextSymbolCode = state.css.charCodeAt(state.pos + 1);

  if (state.symbolCode === _globals.slash && nextSymbolCode === _globals.asterisk) {
    (0, _tokenizeMultilineComment2.default)(state);
  } else if (state.symbolCode === _globals.slash && nextSymbolCode === _globals.slash) {
    (0, _tokenizeInlineComment2.default)(state);
  } else {
    if ((0, _isEscaping2.default)(state)) {
      var pos = (0, _findEndOfEscaping2.default)(state);

      if (pos < 0) {
        (0, _unclosed2.default)(state, 'escaping');
      } else {
        state.nextPos = pos;
      }
    } else {
      _globals.wordEndPattern.lastIndex = state.pos + 1;
      _globals.wordEndPattern.test(state.css);

      if (_globals.wordEndPattern.lastIndex === 0) {
        state.nextPos = state.css.length - 1;
      } else {
        state.nextPos = _globals.wordEndPattern.lastIndex - 2;
      }
    }

    state.cssPart = state.css.slice(state.pos, state.nextPos + 1);

    state.tokens.push(['word', state.cssPart, state.line, state.pos - state.offset, state.line, state.nextPos - state.offset]);

    state.pos = state.nextPos;
  }
}
module.exports = exports['default'];