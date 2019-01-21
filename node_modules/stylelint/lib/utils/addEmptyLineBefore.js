/* @flow */
"use strict";

const _ = require("lodash");

// Add an empty line before a node. Mutates the node.
function addEmptyLineBefore(
  node /*: postcss$node*/,
  newline /*: '\n' | '\r\n'*/
) /*: postcss$node*/ {
  if (!/\r?\n/.test(node.raws.before)) {
    node.raws.before = _.repeat(newline, 2) + node.raws.before;
  } else {
    node.raws.before = node.raws.before.replace(/(\r?\n)/, `${newline}$1`);
  }
  return node;
}

module.exports = addEmptyLineBefore;
