"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minifyCookedValues = exports.minifyRawValues = exports.minifyCooked = exports.minifyRaw = exports.compressSymbols = exports.stripLineComment = void 0;

var _difference = _interopRequireDefault(require("lodash/difference"));

var _placeholderUtils = require("../css/placeholderUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var injectUniquePlaceholders = function injectUniquePlaceholders(strArr) {
  var i = 0;
  return strArr.reduce(function (str, val, index, arr) {
    return str + val + (index < arr.length - 1 ? (0, _placeholderUtils.makePlaceholder)(i++) : '');
  }, '');
};

var makeMultilineCommentRegex = function makeMultilineCommentRegex(newlinePattern) {
  return new RegExp('\\/\\*[^!](.|' + newlinePattern + ')*?\\*\\/', 'g');
};

var lineCommentStart = /\/\//g;
var symbolRegex = /(\s*[;:{},]\s*)/g; // Counts occurences of substr inside str

var countOccurences = function countOccurences(str, substr) {
  return str.split(substr).length - 1;
}; // Joins substrings until predicate returns true


var reduceSubstr = function reduceSubstr(substrs, join, predicate) {
  var length = substrs.length;
  var res = substrs[0];

  if (length === 1) {
    return res;
  }

  for (var i = 1; i < length; i++) {
    if (predicate(res)) {
      break;
    }

    res += join + substrs[i];
  }

  return res;
}; // Joins at comment starts when it's inside a string or parantheses
// effectively removing line comments


var stripLineComment = function stripLineComment(line) {
  return reduceSubstr(line.split(lineCommentStart), '//', function (str) {
    return !str.endsWith(':') && // NOTE: This is another guard against urls, if they're not inside strings or parantheses.
    countOccurences(str, "'") % 2 === 0 && countOccurences(str, '"') % 2 === 0 && countOccurences(str, '(') === countOccurences(str, ')');
  });
};

exports.stripLineComment = stripLineComment;

var compressSymbols = function compressSymbols(code) {
  return code.split(symbolRegex).reduce(function (str, fragment, index) {
    // Even-indices are non-symbol fragments
    if (index % 2 === 0) {
      return str + fragment;
    } // Only manipulate symbols outside of strings


    if (countOccurences(str, "'") % 2 === 0 && countOccurences(str, '"') % 2 === 0) {
      return str + fragment.trim();
    }

    return str + fragment;
  }, '');
}; // Detects lines that are exclusively line comments


exports.compressSymbols = compressSymbols;

var isLineComment = function isLineComment(line) {
  return line.trim().startsWith('//');
}; // Creates a minifier with a certain linebreak pattern


var minify = function minify(linebreakPattern) {
  var linebreakRegex = new RegExp(linebreakPattern + '\\s*', 'g');
  var multilineCommentRegex = makeMultilineCommentRegex(linebreakPattern);
  return function (code) {
    var newCode = code.replace(multilineCommentRegex, '\n') // Remove multiline comments
    .split(linebreakRegex) // Split at newlines
    .filter(function (line) {
      return line.length > 0 && !isLineComment(line);
    }) // Removes lines containing only line comments
    .map(stripLineComment) // Remove line comments inside text
    .join(' '); // Rejoin all lines

    var eliminatedExpressionIndices = (0, _difference.default)(code.match(_placeholderUtils.placeholderRegex), newCode.match(_placeholderUtils.placeholderRegex)).map(function (x) {
      return parseInt(x.match(/\d+/)[0], 10);
    });
    return [compressSymbols(newCode), eliminatedExpressionIndices];
  };
};

var minifyRaw = minify('(?:\\\\r|\\\\n|\\r|\\n)');
exports.minifyRaw = minifyRaw;
var minifyCooked = minify('[\\r\\n]');
exports.minifyCooked = minifyCooked;

var minifyRawValues = function minifyRawValues(rawValues) {
  return (0, _placeholderUtils.splitByPlaceholders)(minifyRaw(injectUniquePlaceholders(rawValues)), false);
};

exports.minifyRawValues = minifyRawValues;

var minifyCookedValues = function minifyCookedValues(cookedValues) {
  return (0, _placeholderUtils.splitByPlaceholders)(minifyCooked(injectUniquePlaceholders(cookedValues)), false);
};

exports.minifyCookedValues = minifyCookedValues;