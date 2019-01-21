"use strict";

const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const findMediaOperator = require("../findMediaOperator");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "media-feature-range-operator-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => "Expected single space after range operator",
  rejectedAfter: () => "Unexpected whitespace after range operator"
});

const rule = function(expectation) {
  const checker = whitespaceChecker("space", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(/^media$/i, atRule => {
      findMediaOperator(atRule, checkAfterOperator);
    });

    function checkAfterOperator(match, params, node) {
      const endIndex = match.index + match[1].length;

      checker.after({
        source: params,
        index: endIndex,
        err: m => {
          report({
            message: m,
            node,
            index: endIndex + atRuleParamIndex(node) + 1,
            result,
            ruleName
          });
        }
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
