/* @flow */
"use strict";

// Remove empty lines before a node. Mutates the node.
function removeEmptyLinesAfter(
  node /*: postcss$node*/,
  newline /*: '\n' | '\r\n'*/
) /*: postcss$node*/ {
  node.raws.after = node.raws.after.replace(/(\r?\n\s*\r?\n)+/g, newline);

  return node;
}

module.exports = removeEmptyLinesAfter;
