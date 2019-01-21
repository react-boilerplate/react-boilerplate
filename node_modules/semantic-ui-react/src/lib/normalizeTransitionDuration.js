/**
 * Normalizes the duration of a transition.
 * @param {number|object} duration The value to normalize.
 * @param {'hide'|'show'} type The type of transition.
 * @returns {number}
 */
export default (duration, type) => (
  (typeof duration === 'number' || typeof duration === 'string') ? duration : duration[type]
)
