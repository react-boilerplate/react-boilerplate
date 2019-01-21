/* @flow */
"use strict";

/**
 * Check whether a word is a variable i.e var(--custom-property).
 */
module.exports = function(word /*: string*/) /*: boolean*/ {
  return word.toLowerCase().slice(0, 4) === "var(";
};
