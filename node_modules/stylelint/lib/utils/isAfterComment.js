/* @flow */
"use strict";

const isSharedLineComment = require("./isSharedLineComment");

module.exports = function(node /*: postcss$node*/) /*: boolean*/ {
  const previousNode = node.prev();

  if (!previousNode || previousNode.type !== "comment") {
    return false;
  }

  return !isSharedLineComment(previousNode);
};
