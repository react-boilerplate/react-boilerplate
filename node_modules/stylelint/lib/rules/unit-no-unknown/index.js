"use strict";

const _ = require("lodash");
const atRuleParamIndex = require("../../utils/atRuleParamIndex");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const getUnitFromValueNode = require("../../utils/getUnitFromValueNode");
const keywordSets = require("../../reference/keywordSets");
const optionsMatches = require("../../utils/optionsMatches");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueParser = require("postcss-value-parser");

const ruleName = "unit-no-unknown";

const messages = ruleMessages(ruleName, {
  rejected: unit => `Unexpected unknown unit "${unit}"`
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
          ignoreUnits: [_.isString]
        },
        optional: true
      }
    );

    if (!validOptions) {
      return;
    }

    function check(node, value, getIndex) {
      // make sure multiplication operations (*) are divided - not handled
      // by postcss-value-parser
      value = value.replace(/\*/g, ",");
      valueParser(value).walk(function(valueNode) {
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

        if (optionsMatches(options, "ignoreUnits", unit)) {
          return;
        }

        if (keywordSets.units.has(unit.toLowerCase())) {
          return;
        }

        report({
          index: getIndex(node) + valueNode.sourceIndex,
          message: messages.rejected(unit),
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
