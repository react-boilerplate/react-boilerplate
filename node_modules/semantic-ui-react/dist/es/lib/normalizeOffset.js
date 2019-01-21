/**
 * Normalizes the offset value.
 * @param {number|array} value The value to normalize.
 * @returns {number}
 */
export default (function (value) {
  return typeof value === 'number' || typeof value === 'string' ? [value, value] : value;
});