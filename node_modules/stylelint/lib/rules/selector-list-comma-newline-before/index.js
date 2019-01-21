"use strict";

const ruleMessages = require("../../utils/ruleMessages");
const selectorListCommaWhitespaceChecker = require("../selectorListCommaWhitespaceChecker");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "selector-list-comma-newline-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: () => 'Expected newline before ","',
  expectedBeforeMultiLine: () =>
    'Expected newline before "," in a multi-line list',
  rejectedBeforeMultiLine: () =>
    'Unexpected whitespace before "," in a multi-line list'
});

const rule = function(expectation) {
  const checker = whitespaceChecker("newline", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line", "never-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    selectorListCommaWhitespaceChecker({
      root,
      result,
      locationChecker: checker.beforeAllowingIndentation,
      checkedRuleName: ruleName
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
