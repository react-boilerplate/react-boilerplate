"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const keywordSets = require("../../reference/keywordSets");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-pseudo-element-case";

const messages = ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const rule = function(expectation) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["lower", "upper"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      const selector = rule.selector;
      const startIndexPseudoElement = selector.indexOf(":");

      if (startIndexPseudoElement === -1) {
        return;
      }

      parseSelector(selector, result, rule, selectorTree => {
        selectorTree.walkPseudos(pseudoNode => {
          const pseudoElement = pseudoNode.value;

          if (!isStandardSyntaxSelector(pseudoElement)) {
            return;
          }

          if (
            pseudoElement.indexOf("::") === -1 &&
            !keywordSets.levelOneAndTwoPseudoElements.has(
              pseudoElement.toLowerCase().slice(1)
            )
          ) {
            return;
          }

          const expectedPseudoElement =
            expectation === "lower"
              ? pseudoElement.toLowerCase()
              : pseudoElement.toUpperCase();

          if (pseudoElement === expectedPseudoElement) {
            return;
          }

          report({
            message: messages.expected(pseudoElement, expectedPseudoElement),
            node: rule,
            index: pseudoNode.sourceIndex,
            ruleName,
            result
          });
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
