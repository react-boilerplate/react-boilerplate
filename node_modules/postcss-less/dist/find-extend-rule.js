'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findExtendRule;
var extendRuleKeyWords = ['&', ':', 'extend'];
var extendRuleKeyWordsCount = extendRuleKeyWords.length;

function findExtendRule(tokens) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var stack = [];
  var len = tokens.length;
  var end = start;

  while (end < len) {
    var token = tokens[end];

    if (extendRuleKeyWords.indexOf(token[1]) >= 0) {
      stack.push(token[1]);
    } else if (token[0] !== 'space') {
      break;
    }

    end++;
  }

  for (var index = 0; index < extendRuleKeyWordsCount; index++) {
    if (stack[index] !== extendRuleKeyWords[index]) {
      return null;
    }
  }

  return tokens.slice(start, end);
}
module.exports = exports['default'];