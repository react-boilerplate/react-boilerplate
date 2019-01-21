"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Normalizes the offset value.
 * @param {number|array} value The value to normalize.
 * @returns {number}
 */
var _default = function _default(value) {
  return typeof value === 'number' || typeof value === 'string' ? [value, value] : value;
};

exports.default = _default;