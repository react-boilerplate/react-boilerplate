"use strict";

const _ = require("lodash");
const beforeBlockString = require("../../utils/beforeBlockString");
const blockString = require("../../utils/blockString");
const isSingleLineString = require("../../utils/isSingleLineString");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "declaration-block-single-line-max-declarations";

const messages = ruleMessages(ruleName, {
  expected: max =>
    `Expected no more than ${max} ${max === 1 ? "declaration" : "declarations"}`
});

const rule = function(quantity) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: quantity,
      possible: [_.isNumber]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isSingleLineString(blockString(rule))) {
        return;
      }
      if (!rule.nodes) {
        return;
      }

      const decls = rule.nodes.filter(node => node.type === "decl");

      if (decls.length <= quantity) {
        return;
      }

      report({
        message: messages.expected(quantity),
        node: rule,
        index: beforeBlockString(rule, { noRawBefore: true }).length,
        result,
        ruleName
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
