"use strict";

const ruleMessages = require("../../utils/ruleMessages");
const selectorAttributeOperatorSpaceChecker = require("../selectorAttributeOperatorSpaceChecker");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "selector-attribute-operator-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: operator => `Expected single space after "${operator}"`,
  rejectedAfter: operator => `Unexpected whitespace after "${operator}"`
});

const rule = function(expectation) {
  return (root, result) => {
    const checker = whitespaceChecker("space", expectation, messages);
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
      locationChecker: checker.after,
      checkedRuleName: ruleName,
      checkBeforeOperator: false
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
