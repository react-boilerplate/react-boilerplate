"use strict";

const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const isCustomMediaQuery = require("../../utils/isCustomMediaQuery");
const isRangeContextMediaFeature = require("../../utils/isRangeContextMediaFeature");
const isStandardSyntaxMediaFeatureName = require("../../utils/isStandardSyntaxMediaFeatureName");
const mediaParser = require("postcss-media-query-parser").default;
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "media-feature-name-case";

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

    root.walkAtRules(/^media$/i, atRule => {
      mediaParser(atRule.params).walk(/^media-feature$/i, mediaFeatureNode => {
        const parent = mediaFeatureNode.parent;
        const sourceIndex = mediaFeatureNode.sourceIndex;
        const value = mediaFeatureNode.value;

        if (
          isRangeContextMediaFeature(parent.value) ||
          !isStandardSyntaxMediaFeatureName(value) ||
          isCustomMediaQuery(value)
        ) {
          return;
        }

        const expectedFeatureName =
          expectation === "lower" ? value.toLowerCase() : value.toUpperCase();

        if (value === expectedFeatureName) {
          return;
        }

        report({
          index: atRuleParamIndex(atRule) + sourceIndex,
          message: messages.expected(value, expectedFeatureName),
          node: atRule,
          ruleName,
          result
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
