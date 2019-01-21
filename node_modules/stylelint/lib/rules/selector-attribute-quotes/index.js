"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-attribute-quotes";

const messages = ruleMessages(ruleName, {
  expected: value => `Expected quotes around "${value}"`,
  rejected: value => `Unexpected quotes around "${value}"`
});

const rule = function(expectation) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      if (!isStandardSyntaxSelector(rule.selector)) {
        return;
      }
      if (
        rule.selector.indexOf("[") === -1 ||
        rule.selector.indexOf("=") === -1
      ) {
        return;
      }
      parseSelector(rule.selector, result, rule, selectorTree => {
        selectorTree.walkAttributes(attributeNode => {
          if (!attributeNode.operator) {
            return;
          }

          const attributeSelectorString = attributeNode.toString();

          if (!attributeNode.quoted && expectation === "always") {
            complain(
              messages.expected(attributeNode.raws.unquoted),
              attributeNode.sourceIndex +
                attributeSelectorString.indexOf(attributeNode.value)
            );
          }

          if (attributeNode.quoted && expectation === "never") {
            complain(
              messages.rejected(attributeNode.raws.unquoted),
              attributeNode.sourceIndex +
                attributeSelectorString.indexOf(attributeNode.value)
            );
          }
        });
      });

      function complain(message, index) {
        report({
          message,
          index,
          result,
          ruleName,
          node: rule
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
