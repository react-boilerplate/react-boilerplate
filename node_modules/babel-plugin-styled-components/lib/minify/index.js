'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minifyCookedValues = exports.minifyRawValues = exports.minifyCooked = exports.minifyRaw = exports.compressSymbols = exports.stripLineComment = undefined;

var _placeholderUtils = require('../css/placeholderUtils');

var makeMultilineCommentRegex = function makeMultilineCommentRegex(newlinePattern) {
  return new RegExp('\\/\\*[^!](.|' + newlinePattern + ')*?\\*\\/', 'g');
};
var lineCommentStart = /\/\//g;
var symbolRegex = /(\s*[;:{},]\s*)/g;

// Counts occurences of substr inside str
var countOccurences = function countOccurences(str, substr) {
  return str.split(substr).length - 1;
};

// Joins substrings until predicate returns true
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
};

// Joins at comment starts when it's inside a string or parantheses
// effectively removing line comments
var stripLineComment = exports.stripLineComment = function stripLineComment(line) {
  return reduceSubstr(line.split(lineCommentStart), '//', function (str) {
    return !str.endsWith(':') && // NOTE: This is another guard against urls, if they're not inside strings or parantheses.
    countOccurences(str, '\'') % 2 === 0 && countOccurences(str, '\"') % 2 === 0 && countOccurences(str, '(') === countOccurences(str, ')');
  });
};

var compressSymbols = exports.compressSymbols = function compressSymbols(code) {
  return code.split(symbolRegex).reduce(function (str, fragment, index) {
    // Even-indices are non-symbol fragments
    if (index % 2 === 0) {
      return str + fragment;
    }

    // Only manipulate symbols outside of strings
    if (countOccurences(str, '\'') % 2 === 0 && countOccurences(str, '\"') % 2 === 0) {
      return str + fragment.trim();
    }

    return str + fragment;
  }, '');
};

// Detects lines that are exclusively line comments
var isLineComment = function isLineComment(line) {
  return line.trim().startsWith('//');
};

// Creates a minifier with a certain linebreak pattern
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

    return compressSymbols(newCode);
  };
};

var minifyRaw = exports.minifyRaw = minify('(?:\\\\r|\\\\n|\\r|\\n)');
var minifyCooked = exports.minifyCooked = minify('[\\r\\n]');

var minifyRawValues = exports.minifyRawValues = function minifyRawValues(rawValues) {
  return (0, _placeholderUtils.splitByPlaceholders)(minifyRaw(rawValues.join((0, _placeholderUtils.makePlaceholder)(123))), false);
};

var minifyCookedValues = exports.minifyCookedValues = function minifyCookedValues(cookedValues) {
  return (0, _placeholderUtils.splitByPlaceholders)(minifyCooked(cookedValues.join((0, _placeholderUtils.makePlaceholder)(123))), false);
};