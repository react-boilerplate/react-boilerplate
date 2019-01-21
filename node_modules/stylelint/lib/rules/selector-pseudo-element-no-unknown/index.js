"use strict";

const _ = require("lodash");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const keywordSets = require("../../reference/keywordSets");
const optionsMatches = require("../../utils/optionsMatches");
const parseSelector = require("../../utils/parseSelector");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-pseudo-element-no-unknown";

const messages = ruleMessages(ruleName, {
  rejected: selector =>
    `Unexpected unknown pseudo-element selector "${selector}"`
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
          ignorePseudoElements: [_.isString]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      const selector = rule.selector;

      // Return early before parse if no pseudos for performance

      if (selector.indexOf(":") === -1) {
        return;
      }

      parseSelector(selector, result, rule, selectorTree => {
        selectorTree.walkPseudos(pseudoNode => {
          const value = pseudoNode.value;

          if (!isStandardSyntaxSelector(value)) {
            return;
          }

          // Ignore pseudo-classes
          if (value.slice(0, 2) !== "::") {
            return;
          }

          if (
            optionsMatches(
              options,
              "ignorePseudoElements",
              pseudoNode.value.slice(2)
            )
          ) {
            return;
          }

          const name = value.slice(2);

          if (
            postcss.vendor.prefix(name) ||
            keywordSets.pseudoElements.has(name.toLowerCase())
          ) {
            return;
          }

          report({
            message: messages.rejected(value),
            node: rule,
            index: pseudoNode.sourceIndex,
            ruleName,
            result
          });
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
