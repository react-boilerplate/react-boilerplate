/* @flow */
"use strict";

/**
 * Check whether a function is standard
 */
module.exports = function(node /*: Object*/) /*: boolean*/ {
  // Function nodes without names are things in parentheses like Sass lists
  if (!node.value) {
    return false;
  }

  return true;
};
