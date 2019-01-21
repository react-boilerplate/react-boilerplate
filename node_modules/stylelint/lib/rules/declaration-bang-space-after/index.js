"use strict";

const declarationBangSpaceChecker = require("../declarationBangSpaceChecker");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "declaration-bang-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected single space after "!"',
  rejectedAfter: () => 'Unexpected whitespace after "!"'
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

    declarationBangSpaceChecker({
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
