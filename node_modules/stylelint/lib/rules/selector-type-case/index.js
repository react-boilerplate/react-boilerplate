"use strict";

const _ = require("lodash");
const isKeyframeSelector = require("../../utils/isKeyframeSelector");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const isStandardSyntaxTypeSelector = require("../../utils/isStandardSyntaxTypeSelector");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-type-case";

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
      let hasComments = _.get(rule, "raws.selector.raw");
      const selector = hasComments ? hasComments : rule.selector;
      const selectors = rule.selectors;

      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      if (!isStandardSyntaxSelector(selector)) {
        return;
      }
      if (selectors.some(s => isKeyframeSelector(s))) {
        return;
      }

      parseSelector(selector, result, rule, selectorAST => {
        selectorAST.walkTags(tag => {
          if (!isStandardSyntaxTypeSelector(tag)) {
            return;
          }

          const sourceIndex = tag.sourceIndex;
          const value = tag.value;

          const expectedValue =
            expectation === "lower" ? value.toLowerCase() : value.toUpperCase();

          if (value === expectedValue) {
            return;
          }

          if (context.fix) {
            if (hasComments) {
              hasComments =
                hasComments.slice(0, sourceIndex) +
                expectedValue +
                hasComments.slice(sourceIndex + value.length);
              _.set(rule, "raws.selector.raw", hasComments);
            } else {
              rule.selector =
                rule.selector.slice(0, sourceIndex) +
                expectedValue +
                rule.selector.slice(sourceIndex + value.length);
            }
            return;
          }

          report({
            message: messages.expected(value, expectedValue),
            node: rule,
            index: sourceIndex,
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
