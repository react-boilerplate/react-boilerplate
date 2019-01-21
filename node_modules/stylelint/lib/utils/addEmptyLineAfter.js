/* @flow */
"use strict";

const _ = require("lodash");

// Add an empty line after a node. Mutates the node.
function addEmptyLineAfter(
  node /*: postcss$node*/,
  newline /*: '\n' | '\r\n'*/
) /*: postcss$node*/ {
  const after = _.last(node.raws.after.split(";"));
  if (!/\r?\n/.test(after)) {
    node.raws.after = node.raws.after + _.repeat(newline, 2);
  } else {
    node.raws.after = node.raws.after.replace(/(\r?\n)/, `${newline}$1`);
  }
  return node;
}

module.exports = addEmptyLineAfter;
