"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Normalizes the duration of a transition.
 * @param {number|object} duration The value to normalize.
 * @param {'hide'|'show'} type The type of transition.
 * @returns {number}
 */
var _default = function _default(duration, type) {
  return typeof duration === 'number' || typeof duration === 'string' ? duration : duration[type];
};

exports.default = _default;