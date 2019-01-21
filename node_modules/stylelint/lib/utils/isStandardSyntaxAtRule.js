/* @flow */
"use strict";

/**
 * Check whether a at-rule is standard
 *
 * @param {atRule} postcss at-rule node
 * @return {boolean} If `true`, the declaration is standard
 */
module.exports = function(atRule /*: postcss$atRule*/) /*: boolean*/ {
  // Ignore scss `@content` inside mixins
  if (!atRule.nodes && atRule.params === "") {
    return false;
  }

  // Ignore detached ruleset `@detached-ruleset: { background: red; }; .top { @detached-ruleset(); }`
  if (
    !atRule.nodes &&
    atRule.raws.afterName === "" &&
    atRule.params[0] === "("
  ) {
    return false;
  }

  return true;
};
