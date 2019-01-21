"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitByPlaceholders = exports.makePlaceholder = exports.placeholderRegex = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// The capture group makes sure that the split contains the interpolation index
var placeholderRegex = /(?:__PLACEHOLDER_(\d+)__)/g; // Alternative regex that splits without a capture group

exports.placeholderRegex = placeholderRegex;
var placeholderNonCapturingRegex = /__PLACEHOLDER_(?:\d+)__/g; // Generates a placeholder from an index

var makePlaceholder = function makePlaceholder(index) {
  return `__PLACEHOLDER_${index}__`;
}; // Splits CSS by placeholders


exports.makePlaceholder = makePlaceholder;

var splitByPlaceholders = function splitByPlaceholders(_ref) {
  var _ref2 = _toArray(_ref),
      css = _ref2[0],
      rest = _ref2.slice(1);

  var capture = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return [css.split(capture ? placeholderRegex : placeholderNonCapturingRegex)].concat(_toConsumableArray(rest));
};

exports.splitByPlaceholders = splitByPlaceholders;