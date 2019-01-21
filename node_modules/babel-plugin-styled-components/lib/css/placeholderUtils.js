'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// The capture group makes sure that the split contains the interpolation index
var placeholderRegex = /__PLACEHOLDER_(\d+?)__/;

// Alternative regex that splits without a capture group
var placeholderNonCapturingRegex = /__PLACEHOLDER_(?:\d+?)__/;

// This matches the global group w/o a selector
var globalRulesetRegex = /^{([^}]*)}/;

var lastInArr = function lastInArr(arr) {
  return arr[arr.length - 1];
};

// Return position of needle in string or Infinity
var findIndex = function findIndex(string, needle) {
  var index = string.indexOf(needle);
  return index > -1 ? index : Infinity;
};

// Looks if the CSS partial after mixin needs to be prefixed with a semicolon
var isUnendedMixin = exports.isUnendedMixin = function isUnendedMixin(css) {
  var newlinePos = findIndex(css, '\n');
  var semicolonPos = findIndex(css, ';');
  var colonPos = findIndex(css, ':');
  var openParensPos = findIndex(css, '{');
  var closingParensPos = findIndex(css, '}');

  var isNewlineFirst = isFinite(newlinePos) && newlinePos === Math.min(newlinePos, semicolonPos, colonPos, openParensPos, closingParensPos);

  // If newline isn't first, prefixed interpolation can't be a mixin
  if (!isNewlineFirst) {
    return false;
  }

  var minCharPos = Math.min(semicolonPos, colonPos, openParensPos, closingParensPos);

  // If this is followed by a semicolon or colon, then we don't want to add a semicolon
  return isFinite(minCharPos) && minCharPos !== semicolonPos;
};

// Generates a placeholder from an index
var makePlaceholder = exports.makePlaceholder = function makePlaceholder(index) {
  return `__PLACEHOLDER_${index}__`;
};

// Our temporary classname
var temporaryClassname = exports.temporaryClassname = '__TEMPORARY_CLASSNAME__';

// Checks whether the CSS already contains something that matches our placeholders
var containsPlaceholders = exports.containsPlaceholders = function containsPlaceholders(css) {
  return !!css.match(placeholderRegex);
};

// Splits CSS by placeholders
var splitByPlaceholders = exports.splitByPlaceholders = function splitByPlaceholders(css) {
  var capture = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return css.split(capture ? placeholderRegex : placeholderNonCapturingRegex);
};

// Remove curly braces around global placeholders
// We need to replace mixin-semicolons with newlines to not break browser CSS parsing
var fixGlobalPlaceholders = exports.fixGlobalPlaceholders = function fixGlobalPlaceholders(css) {
  return css.replace(globalRulesetRegex, function (_, p1) {
    return p1 ? p1.replace(';', '\n') : '';
  });
};