/* @flow */
"use strict";

/**
 * Check if a rule is a keyframe one
 */
module.exports = function(rule /*: postcss$rule*/) /*: boolean*/ {
  const parent = rule.parent;

  return parent.type === "atrule" && parent.name.toLowerCase() === "keyframes";
};
