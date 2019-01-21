"use strict";

const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueListCommaWhitespaceChecker = require("../valueListCommaWhitespaceChecker");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "value-list-comma-space-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: () => 'Expected single space before ","',
  rejectedBefore: () => 'Unexpected whitespace before ","',
  expectedBeforeSingleLine: () =>
    'Unexpected whitespace before "," in a single-line list',
  rejectedBeforeSingleLine: () =>
    'Unexpected whitespace before "," in a single-line list'
});

const rule = function(expectation) {
  const checker = whitespaceChecker("space", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never", "always-single-line", "never-single-line"]
    });
    if (!validOptions) {
      return;
    }

    valueListCommaWhitespaceChecker({
      root,
      result,
      locationChecker: checker.before,
      checkedRuleName: ruleName
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
