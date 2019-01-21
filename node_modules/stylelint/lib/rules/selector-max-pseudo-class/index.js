"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const keywordSets = require("../../reference/keywordSets");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const resolvedNestedSelector = require("postcss-resolve-nested-selector");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-max-pseudo-class";

const messages = ruleMessages(ruleName, {
  expected: (selector, max) =>
    `Expected "${selector}" to have no more than ${max} pseudo-${
      max === 1 ? "class" : "classes"
    }`
});

function rule(max) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: max,
      possible: [
        function(max) {
          return typeof max === "number" && max >= 0;
        }
      ]
    });
    if (!validOptions) {
      return;
    }

    function checkSelector(selectorNode, ruleNode) {
      const count = selectorNode.reduce((total, childNode) => {
        // Only traverse inside actual selectors and :not()
        if (childNode.type === "selector" || childNode.value === ":not") {
          checkSelector(childNode, ruleNode);
        }

        // Exclude pseudo elements from the count
        if (
          childNode.type === "pseudo" &&
          (childNode.value.indexOf("::") !== -1 ||
            keywordSets.levelOneAndTwoPseudoElements.has(
              childNode.value.toLowerCase().slice(1)
            ))
        ) {
          return total;
        }

        if (childNode.type === "pseudo") {
          return (total += 1);
        }

        return total;
      }, 0);

      if (count > max) {
        report({
          ruleName,
          result,
          node: ruleNode,
          message: messages.expected(selectorNode, max),
          word: selectorNode
        });
      }
    }

    root.walkRules(ruleNode => {
      if (!isStandardSyntaxRule(ruleNode)) {
        return;
      }
      if (!isStandardSyntaxSelector(ruleNode.selector)) {
        return;
      }

      ruleNode.selectors.forEach(selector => {
        resolvedNestedSelector(selector, ruleNode).forEach(resolvedSelector => {
          parseSelector(resolvedSelector, result, rule, selectorTree => {
            checkSelector(selectorTree, ruleNode);
          });
        });
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
