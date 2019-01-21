"use strict";

const isSharedLineComment = require("./isSharedLineComment");

function isAfterSingleLineComment(node /*: postcss$node*/) /*: boolean*/ {
  const prevNode = node.prev();

  return (
    prevNode !== undefined &&
    prevNode.type === "comment" &&
    !isSharedLineComment(prevNode) &&
    prevNode.source.start.line === prevNode.source.end.line
  );
}

module.exports = isAfterSingleLineComment;
