/* @flow */
"use strict";

/**
 * Check if a string contains at least one empty line
 */
module.exports = function(string /*:: ?: string*/) /*: boolean*/ {
  if (string === "" || string === undefined) return false;

  return /\n[\r\t ]*\n/.test(string);
};
