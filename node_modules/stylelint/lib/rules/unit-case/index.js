"use strict";

const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const getUnitFromValueNode = require("../../utils/getUnitFromValueNode");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueParser = require("postcss-value-parser");

const ruleName = "unit-case";

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

    function check(node, value, getIndex) {
      // make sure multiplication operations (*) are divided - not handled
      // by postcss-value-parser
      value = value.replace(/\*/g, ",");
      valueParser(value).walk(valueNode => {
        // Ignore wrong units within `url` function
        if (
          valueNode.type === "function" &&
          valueNode.value.toLowerCase() === "url"
        ) {
          return false;
        }

        const unit = getUnitFromValueNode(valueNode);

        if (!unit) {
          return;
        }

        const expectedUnit =
          expectation === "lower" ? unit.toLowerCase() : unit.toUpperCase();

        if (unit === expectedUnit) {
          return;
        }

        report({
          index: getIndex(node) + valueNode.sourceIndex,
          message: messages.expected(unit, expectedUnit),
          node,
          result,
          ruleName
        });
      });
    }

    root.walkAtRules(/^media$/i, atRule =>
      check(atRule, atRule.params, atRuleParamIndex)
    );
    root.walkDecls(decl => check(decl, decl.value, declarationValueIndex));
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
