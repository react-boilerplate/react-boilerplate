"use strict";

const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueListCommaWhitespaceChecker = require("../valueListCommaWhitespaceChecker");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "value-list-comma-newline-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected newline after ","',
  expectedAfterMultiLine: () =>
    'Expected newline after "," in a multi-line list',
  rejectedAfterMultiLine: () =>
    'Unexpected whitespace after "," in a multi-line list'
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

    valueListCommaWhitespaceChecker({
      root,
      result,
      locationChecker: checker.afterOneOnly,
      checkedRuleName: ruleName
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
