"use strict";

const functionCommaSpaceChecker = require("../functionCommaSpaceChecker");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "function-comma-space-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: () => 'Expected single space before ","',
  rejectedBefore: () => 'Unexpected whitespace before ","',
  expectedBeforeSingleLine: () =>
    'Expected single space before "," in a single-line function',
  rejectedBeforeSingleLine: () =>
    'Unexpected whitespace before "," in a single-line function'
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

    functionCommaSpaceChecker({
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
