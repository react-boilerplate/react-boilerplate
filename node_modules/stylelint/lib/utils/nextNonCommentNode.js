/* @flow */
"use strict";

/**
 * Get the next non-comment node in a PostCSS AST
 * at or after a given node.
 */
module.exports = function nextNonCommentNode(
  startNode /*: Object*/
) /*: ?Object*/ {
  if (!startNode || !startNode.next) return null;

  if (startNode.type === "comment") {
    return nextNonCommentNode(startNode.next());
  }

  return startNode;
};
