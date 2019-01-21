/* @flow */
"use strict";

/**
 * Find the at-rule in which a rule is nested.
 *
 * Returns `null` if the rule is not nested within an at-rule.
 */
module.exports = function findAtRuleContext(
  rule /*: postcss$rule */
) /*: ?postcss$node*/ {
  const parent = rule.parent;

  if (parent.type === "root") {
    return null;
  }
  if (parent.type === "atrule") {
    return parent;
  }
  return findAtRuleContext(parent);
};
