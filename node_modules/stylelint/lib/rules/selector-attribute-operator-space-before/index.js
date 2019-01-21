"use strict";

const ruleMessages = require("../../utils/ruleMessages");
const selectorAttributeOperatorSpaceChecker = require("../selectorAttributeOperatorSpaceChecker");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "selector-attribute-operator-space-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: operator => `Expected single space before "${operator}"`,
  rejectedBefore: operator => `Unexpected whitespace before "${operator}"`
});

const rule = function(expectation) {
  const checker = whitespaceChecker("space", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    selectorAttributeOperatorSpaceChecker({
      root,
      result,
      locationChecker: checker.before,
      checkedRuleName: ruleName,
      checkBeforeOperator: true
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
