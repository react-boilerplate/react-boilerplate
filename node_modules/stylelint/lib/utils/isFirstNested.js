/* @flow */
"use strict";

module.exports = function(statement /*: postcss$node*/) /*: boolean*/ {
  const parentNode = statement.parent;

  if (parentNode === undefined || parentNode.type === "root") {
    return false;
  }

  if (statement === parentNode.first) {
    return true;
  }

  /*
   * Search for the statement in the parent's nodes, ignoring comment
   * nodes on the same line as the parent's opening brace.
   */

  const parentNodes = parentNode.nodes;
  const firstNode = parentNodes[0];

  if (firstNode.type !== "comment" || firstNode.raws.before.includes("\n")) {
    return false;
  }

  const openingBraceLine = firstNode.source.start.line;

  if (openingBraceLine !== firstNode.source.end.line) {
    return false;
  }

  for (let i = 1; i < parentNodes.length; i++) {
    const node = parentNodes[i];

    if (node === statement) {
      return true;
    }

    if (node.type !== "comment" || node.source.end.line !== openingBraceLine) {
      return false;
    }
  }

  /* istanbul ignore next: Should always return in the loop */
  return false;
};
