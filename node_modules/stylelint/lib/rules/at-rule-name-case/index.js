"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "at-rule-name-case";

const messages = ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const rule = function(expectation, options, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["lower", "upper"]
    });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(atRule => {
      const name = atRule.name;

      const expectedName =
        expectation === "lower" ? name.toLowerCase() : name.toUpperCase();

      if (name === expectedName) {
        return;
      }

      if (context.fix) {
        atRule.name = expectedName;
        return;
      }

      report({
        message: messages.expected(name, expectedName),
        node: atRule,
        ruleName,
        result
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
