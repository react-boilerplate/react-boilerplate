/* @flow */
"use strict";

const _ = require("lodash");

function getNodeLine(node /*:: ?: postcss$node*/) /*: number | void*/ {
  return _.get(node, "source.start.line");
}

module.exports = function getPreviousNonSharedLineCommentNode(
  node /*:: ?: postcss$node*/
) /*: postcss$node | void*/ {
  if (node === undefined) {
    return undefined;
  }

  const previousNode = node.prev();

  if (_.get(previousNode, "type") !== "comment") {
    return previousNode;
  }

  if (
    getNodeLine(node) === getNodeLine(previousNode) ||
    (previousNode !== undefined &&
      getNodeLine(previousNode) === getNodeLine(previousNode.prev()))
  ) {
    return getPreviousNonSharedLineCommentNode(previousNode);
  }

  return previousNode;
};
