/* @flow */
"use strict";

module.exports = function(node /*: postcss$node*/) /*: boolean*/ {
  const parentNode = node.parent;
  return parentNode.type === "root" && node === parentNode.first;
};
