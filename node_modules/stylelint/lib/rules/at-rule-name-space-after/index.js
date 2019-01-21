"use strict";

const atRuleNameSpaceChecker = require("../atRuleNameSpaceChecker");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "at-rule-name-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: name => `Expected single space after at-rule name "${name}"`
});

const rule = function(expectation) {
  const checker = whitespaceChecker("space", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-single-line"]
    });
    if (!validOptions) {
      return;
    }

    atRuleNameSpaceChecker({
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
