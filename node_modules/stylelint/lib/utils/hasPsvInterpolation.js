/* @flow */
"use strict";

/**
 * Check whether a string has postcss-simple-vars interpolation
 */
module.exports = function(string /*: string*/) /*: boolean*/ {
  return /\$\(.+?\)/.test(string);
};
