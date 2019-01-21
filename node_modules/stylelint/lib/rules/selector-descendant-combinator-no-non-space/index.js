"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const parseSelector = require("../../utils/parseSelector");
const punctuationSets = require("../../reference/punctuationSets");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-descendant-combinator-no-non-space";

const messages = ruleMessages(ruleName, {
  rejected: nonSpaceCharacter => `Unexpected "${nonSpaceCharacter}"`
});

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }

      const selector = rule.selector;

      parseSelector(selector, result, rule, fullSelector => {
        fullSelector.walkCombinators(combinatorNode => {
          const value = combinatorNode.value;

          if (punctuationSets.nonSpaceCombinators.has(value)) {
            return;
          }
          if (value === " ") {
            return;
          }

          report({
            result,
            ruleName,
            message: messages.rejected(value),
            node: rule,
            index: combinatorNode.sourceIndex
          });
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
