"use strict";

const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueListCommaWhitespaceChecker = require("../valueListCommaWhitespaceChecker");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "value-list-comma-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected single space after ","',
  rejectedAfter: () => 'Unexpected whitespace after ","',
  expectedAfterSingleLine: () =>
    'Expected single space after "," in a single-line list',
  rejectedAfterSingleLine: () =>
    'Unexpected whitespace after "," in a single-line list'
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
      locationChecker: checker.after,
      checkedRuleName: ruleName
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
