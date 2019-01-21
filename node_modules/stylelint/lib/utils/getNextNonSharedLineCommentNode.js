/* @flow */
"use strict";

const _ = require("lodash");

function getNodeLine(node /*:: ?: postcss$node*/) /*: number | void*/ {
  return _.get(node, "source.start.line");
}

module.exports = function getNextNonSharedLineCommentNode(
  node /*:: ?: postcss$node*/
) /*: postcss$node | void*/ {
  if (node === undefined) {
    return undefined;
  }

  const nextNode = node.next();

  if (_.get(nextNode, "type") !== "comment") {
    return nextNode;
  }

  if (
    getNodeLine(node) === getNodeLine(nextNode) ||
    (nextNode !== undefined &&
      getNodeLine(nextNode) === getNodeLine(nextNode.next()))
  ) {
    return getNextNonSharedLineCommentNode(nextNode);
  }

  return nextNode;
};
