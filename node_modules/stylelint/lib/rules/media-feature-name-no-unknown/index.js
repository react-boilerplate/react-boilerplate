"use strict";

const _ = require("lodash");
const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const isCustomMediaQuery = require("../../utils/isCustomMediaQuery");
const isRangeContextMediaFeature = require("../../utils/isRangeContextMediaFeature");
const isStandardSyntaxMediaFeatureName = require("../../utils/isStandardSyntaxMediaFeatureName");
const keywordSets = require("../../reference/keywordSets");
const mediaParser = require("postcss-media-query-parser").default;
const optionsMatches = require("../../utils/optionsMatches");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "media-feature-name-no-unknown";

const messages = ruleMessages(ruleName, {
  rejected: mediaFeatureName =>
    `Unexpected unknown media feature name "${mediaFeatureName}"`
});

const rule = function(actual, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      { actual },
      {
        actual: options,
        possible: {
          ignoreMediaFeatureNames: [_.isString]
        },
        optional: true
      }
    );

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

        if (optionsMatches(options, "ignoreMediaFeatureNames", value)) {
          return;
        }

        if (
          postcss.vendor.prefix(value) ||
          keywordSets.mediaFeatureNames.has(value.toLowerCase())
        ) {
          return;
        }

        report({
          index: atRuleParamIndex(atRule) + sourceIndex,
          message: messages.rejected(value),
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
