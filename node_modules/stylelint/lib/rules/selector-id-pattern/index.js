"use strict";

const _ = require("lodash");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-id-pattern";

const messages = ruleMessages(ruleName, {
  expected: selectorValue =>
    `Expected ID selector "#${selectorValue}" to match specified pattern`
});

const rule = function(pattern) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: pattern,
      possible: [_.isRegExp, _.isString]
    });
    if (!validOptions) {
      return;
    }

    const normalizedPattern = _.isString(pattern)
      ? new RegExp(pattern)
      : pattern;

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }

      const selector = rule.selector;

      if (!isStandardSyntaxSelector(selector)) {
        return;
      }

      parseSelector(selector, result, rule, fullSelector => {
        fullSelector.walk(selectorNode => {
          if (selectorNode.type !== "id") {
            return;
          }
          const value = selectorNode.value;
          const sourceIndex = selectorNode.sourceIndex;

          if (normalizedPattern.test(value)) {
            return;
          }

          report({
            result,
            ruleName,
            message: messages.expected(value),
            node: rule,
            index: sourceIndex
          });
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
