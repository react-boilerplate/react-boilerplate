"use strict";

const ruleMessages = require("../../utils/ruleMessages");
const selectorCombinatorSpaceChecker = require("../selectorCombinatorSpaceChecker");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "selector-combinator-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: combinator => `Expected single space after "${combinator}"`,
  rejectedAfter: combinator => `Unexpected whitespace after "${combinator}"`
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

    selectorCombinatorSpaceChecker({
      root,
      result,
      locationChecker: checker.after,
      locationType: "after",
      checkedRuleName: ruleName
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
