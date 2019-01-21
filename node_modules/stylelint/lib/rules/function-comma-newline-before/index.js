"use strict";

const functionCommaSpaceChecker = require("../functionCommaSpaceChecker");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "function-comma-newline-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: () => 'Expected newline before ","',
  expectedBeforeMultiLine: () =>
    'Expected newline before "," in a multi-line function',
  rejectedBeforeMultiLine: () =>
    'Unexpected whitespace before "," in a multi-line function'
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

    functionCommaSpaceChecker({
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
