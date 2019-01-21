"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var fitsMaxWidth = function fitsMaxWidth(width, maxWidth) {
  return (0, _isNil2.default)(maxWidth) ? true : width <= maxWidth;
};

var fitsMinWidth = function fitsMinWidth(width, minWidth) {
  return (0, _isNil2.default)(minWidth) ? true : width >= minWidth;
};

var isVisible = function isVisible(width, _ref) {
  var maxWidth = _ref.maxWidth,
      minWidth = _ref.minWidth;
  return fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth);
};

var _default = isVisible;
exports.default = _default;