/* @flow */
"use strict";

/**
 * Check if a character is whitespace.
 */
module.exports = function(char /*: string*/) /*: boolean*/ {
  return [" ", "\n", "\t", "\r", "\f"].indexOf(char) !== -1;
};
