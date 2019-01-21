"use strict";

const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const findMediaOperator = require("../findMediaOperator");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "media-feature-range-operator-space-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: () => "Expected single space before range operator",
  rejectedBefore: () => "Unexpected whitespace before range operator"
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
      findMediaOperator(atRule, checkBeforeOperator);
    });

    function checkBeforeOperator(match, params, node) {
      // The extra `+ 1` is because the match itself contains
      // the character before the operator
      checker.before({
        source: params,
        index: match.index + 1,
        err: m => {
          report({
            message: m,
            node,
            index: match.index + atRuleParamIndex(node),
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
