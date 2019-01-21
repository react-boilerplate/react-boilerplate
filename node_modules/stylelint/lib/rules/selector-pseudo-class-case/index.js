"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const keywordSets = require("../../reference/keywordSets");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-pseudo-class-case";

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

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      const selector = rule.selector;
      const startIndexPseudo = selector.indexOf(":");

      if (startIndexPseudo === -1) {
        return;
      }

      const fixedSelector = parseSelector(
        rule.raws.selector ? rule.raws.selector.raw : rule.selector,
        result,
        rule,
        selectorTree => {
          selectorTree.walkPseudos(pseudoNode => {
            const pseudo = pseudoNode.value;

            if (!isStandardSyntaxSelector(pseudo)) {
              return;
            }

            if (
              pseudo.indexOf("::") !== -1 ||
              keywordSets.levelOneAndTwoPseudoElements.has(
                pseudo.toLowerCase().slice(1)
              )
            ) {
              return;
            }

            const expectedPseudo =
              expectation === "lower"
                ? pseudo.toLowerCase()
                : pseudo.toUpperCase();

            if (pseudo === expectedPseudo) {
              return;
            }

            if (context.fix) {
              pseudoNode.value = expectedPseudo;
              return;
            }

            report({
              message: messages.expected(pseudo, expectedPseudo),
              node: rule,
              index: pseudoNode.sourceIndex,
              ruleName,
              result
            });
          });
        }
      );

      if (context.fix) {
        if (rule.raws.selector) {
          rule.raws.selector.raw = fixedSelector;
        } else {
          rule.selector = fixedSelector;
        }
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
