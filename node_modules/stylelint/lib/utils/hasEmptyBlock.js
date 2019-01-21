/* @flow */
"use strict";

/**
 * Check if a statement has an empty block.
 *
 * @param {Rule|AtRule} statement - postcss rule or at-rule node
 * @return {boolean} True if the statement has a block and it is empty
 */
module.exports = function(
  statement /*: postcss$rule | postcss$atRule*/
) /*: boolean*/ {
  return (
    statement.nodes !== undefined && statement.nodes.length === 0 // has block
  ); // and is empty
};
