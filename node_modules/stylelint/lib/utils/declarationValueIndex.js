/* @flow */
"use strict";

/**
 * Get the index of a declaration's value
 */
module.exports = function(decl /*: Object*/) /*: number*/ {
  const beforeColon = decl.toString().indexOf(":");
  const afterColon =
    decl.raw("between").length - decl.raw("between").indexOf(":");
  return beforeColon + afterColon;
};
