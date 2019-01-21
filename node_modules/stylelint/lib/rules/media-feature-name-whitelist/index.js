"use strict";

const _ = require("lodash");
const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const isCustomMediaQuery = require("../../utils/isCustomMediaQuery");
const isRangeContextMediaFeature = require("../../utils/isRangeContextMediaFeature");
const isStandardSyntaxMediaFeatureName = require("../../utils/isStandardSyntaxMediaFeatureName");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const mediaParser = require("postcss-media-query-parser").default;
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "media-feature-name-whitelist";

const messages = ruleMessages(ruleName, {
  rejected: name => `Unexpected media feature name "${name}"`
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

        if (matchesStringOrRegExp(value, whitelist)) {
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

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
