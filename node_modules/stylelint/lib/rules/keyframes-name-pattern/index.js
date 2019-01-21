"use strict";

const _ = require("lodash");
const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "keyframes-name-pattern";

const messages = ruleMessages(ruleName, {
  expected: keyframeName =>
    `Expected keyframe name "${keyframeName}" to match specified pattern`
});

const rule = function(pattern) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: pattern,
      possible: [_.isString]
    });

    if (!validOptions) {
      return;
    }

    const regex = _.isString(pattern) ? new RegExp(pattern) : pattern;
    root.walkAtRules(/keyframes/i, keyframesNode => {
      const value = keyframesNode.params;
      if (value.match(regex)) {
        return;
      }

      report({
        index: atRuleParamIndex(keyframesNode),
        message: messages.expected(value),
        node: keyframesNode,
        ruleName,
        result
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
