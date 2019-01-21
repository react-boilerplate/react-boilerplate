"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const resolvedNestedSelector = require("postcss-resolve-nested-selector");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-max-combinators";

const messages = ruleMessages(ruleName, {
  expected: (selector, max) =>
    `Expected "${selector}" to have no more than ${max} ${
      max === 1 ? "combinator" : "combinators"
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
        // Only traverse inside actual selectors
        if (childNode.type === "selector") {
          checkSelector(childNode, ruleNode);
        }

        return (total += childNode.type === "combinator" ? 1 : 0);
      }, 0);

      if (
        selectorNode.type !== "root" &&
        selectorNode.type !== "pseudo" &&
        count > max
      ) {
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
      if (
        ruleNode.nodes.some(
          node => ["rule", "atrule"].indexOf(node.type) !== -1
        )
      ) {
        // Skip unresolved nested selectors
        return;
      }

      ruleNode.selectors.forEach(selector => {
        resolvedNestedSelector(selector, ruleNode).forEach(resolvedSelector => {
          parseSelector(resolvedSelector, result, ruleNode, container =>
            checkSelector(container, ruleNode)
          );
        });
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
