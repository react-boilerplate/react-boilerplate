/* @flow */
"use strict";

/**
 * Check whether a string has template literal interpolation
 *
 * @param {string} string
 * @return {boolean} If `true`, a string has template literal interpolation
 */
module.exports = function(string /*: string*/) /*: boolean*/ {
  return /\${.+?}/.test(string);
};
