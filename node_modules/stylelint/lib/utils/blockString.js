/* @flow */
"use strict";
const beforeBlockString = require("./beforeBlockString");
const hasBlock = require("./hasBlock");
const rawNodeString = require("./rawNodeString");

/**
 * Return a CSS statement's block -- the string that starts and `{` and ends with `}`.
 *
 * If the statement has no block (e.g. `@import url(foo.css);`),
 * return undefined.
 *
 * @param {Rule|AtRule} statement - postcss rule or at-rule node
 * @return {string|undefined}
 */
module.exports = function(
  statement /*: postcss$rule | postcss$atRule*/
) /*: string | boolean*/ {
  if (!hasBlock(statement)) {
    return false;
  }
  return rawNodeString(statement).slice(beforeBlockString(statement).length);
};
