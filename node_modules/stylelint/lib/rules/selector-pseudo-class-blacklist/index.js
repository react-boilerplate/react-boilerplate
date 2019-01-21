"use strict";

const _ = require("lodash");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const parseSelector = require("../../utils/parseSelector");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-pseudo-class-blacklist";

const messages = ruleMessages(ruleName, {
  rejected: selector => `Unexpected pseudo-class "${selector}"`
});

const rule = function(blacklist) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: blacklist,
      possible: [_.isString]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }

      const selector = rule.selector;

      if (!isStandardSyntaxSelector(selector)) {
        return;
      }

      if (selector.indexOf(":") === -1) {
        return;
      }

      parseSelector(selector, result, rule, selectorTree => {
        selectorTree.walkPseudos(pseudoNode => {
          const value = pseudoNode.value;

          // Ignore pseudo-elements

          if (value.slice(0, 2) === "::") {
            return;
          }

          const name = value.slice(1);

          if (
            !matchesStringOrRegExp(postcss.vendor.unprefixed(name), blacklist)
          ) {
            return;
          }

          report({
            index: pseudoNode.sourceIndex,
            message: messages.rejected(name),
            node: rule,
            result,
            ruleName
          });
        });
      });
    });
  };
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
