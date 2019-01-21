"use strict";

const _ = require("lodash");
const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "media-feature-parentheses-space-inside";

const messages = ruleMessages(ruleName, {
  expectedOpening: 'Expected single space after "("',
  rejectedOpening: 'Unexpected whitespace after "("',
  expectedClosing: 'Expected single space before ")"',
  rejectedClosing: 'Unexpected whitespace before ")"'
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

    root.walkAtRules(/^media$/i, atRule => {
      // If there are comments in the params, the complete string
      // will be at atRule.raws.params.raw
      const params = _.get(atRule, "raws.params.raw", atRule.params);
      const indexBoost = atRuleParamIndex(atRule);

      styleSearch({ source: params, target: "(" }, match => {
        const nextCharIsSpace = params[match.startIndex + 1] === " ";
        if (nextCharIsSpace && expectation === "never") {
          report({
            message: messages.rejectedOpening,
            node: atRule,
            index: match.startIndex + 1 + indexBoost,
            result,
            ruleName
          });
        }
        if (!nextCharIsSpace && expectation === "always") {
          report({
            message: messages.expectedOpening,
            node: atRule,
            index: match.startIndex + 1 + indexBoost,
            result,
            ruleName
          });
        }
      });

      styleSearch({ source: params, target: ")" }, match => {
        const prevCharIsSpace = params[match.startIndex - 1] === " ";
        if (prevCharIsSpace && expectation === "never") {
          report({
            message: messages.rejectedClosing,
            node: atRule,
            index: match.startIndex - 1 + indexBoost,
            result,
            ruleName
          });
        }
        if (!prevCharIsSpace && expectation === "always") {
          report({
            message: messages.expectedClosing,
            node: atRule,
            index: match.startIndex - 1 + indexBoost,
            result,
            ruleName
          });
        }
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
