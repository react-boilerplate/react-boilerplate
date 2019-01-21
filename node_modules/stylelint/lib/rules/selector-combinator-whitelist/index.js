"use strict";

const _ = require("lodash");
const isStandardSyntaxCombinator = require("../../utils/isStandardSyntaxCombinator");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-combinator-whitelist";

const messages = ruleMessages(ruleName, {
  rejected: combinator => `Unexpected combinator "${combinator}"`
});

const rule = function(whitelist) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: whitelist,
      possible: [_.isString]
    });
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
          if (!isStandardSyntaxCombinator(combinatorNode)) {
            return;
          }
          const value = normalizeCombinator(combinatorNode.value);

          if (whitelist.indexOf(value) !== -1) {
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

function normalizeCombinator(value) {
  return value.replace(/\s+/g, " ");
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
