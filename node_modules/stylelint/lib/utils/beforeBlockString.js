/* @flow */
"use strict";
module.exports = function(
  statement /*: Object*/,
  options /*:: ?: Object*/
) /*: string*/ {
  options = options || {};

  let result = "";
  let rule; /*?: postcss$rule*/
  let atRule; /*?: postcss$atRule*/

  if (statement.type === "rule") {
    rule = statement;
  }
  if (statement.type === "atrule") {
    atRule = statement;
  }

  if (!rule && !atRule) {
    return result;
  }

  const before = statement.raws.before || "";

  if (!options.noRawBefore) {
    result += before;
  }
  if (rule) {
    result += rule.selector;
  }
  if (atRule) {
    result += "@" + atRule.name + (atRule.raws.afterName || "") + atRule.params;
  }

  const between = statement.raws.between;

  if (between !== undefined) {
    result += between;
  }

  return result;
};
