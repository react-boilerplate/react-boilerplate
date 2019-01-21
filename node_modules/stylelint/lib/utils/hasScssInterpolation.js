/* @flow */
"use strict";

/**
 * Check whether a string has scss interpolation
 */
module.exports = function(string /*: string*/) /*: boolean*/ {
  return /#{.+?}/.test(string);
};
