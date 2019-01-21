/* @flow */
"use strict";

/**
 * Stringify PostCSS node including its raw "before" string.
 */
module.exports = function(node /*: Object*/) /*: string*/ {
  let result = "";
  if (node.raws.before) {
    result += node.raws.before;
  }
  result += node.toString();
  return result;
};
