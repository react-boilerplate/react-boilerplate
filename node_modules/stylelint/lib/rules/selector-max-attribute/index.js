"use strict";

const _ = require("lodash");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const optionsMatches = require("../../utils/optionsMatches");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const resolvedNestedSelector = require("postcss-resolve-nested-selector");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-max-attribute";

const messages = ruleMessages(ruleName, {
  expected: (selector, max) =>
    `Expected "${selector}" to have no more than ${max} attribute ${
      max === 1 ? "selector" : "selectors"
    }`
});

function rule(max, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: max,
        possible: [
          function(max) {
            return typeof max === "number" && max >= 0;
          }
        ]
      },
      {
        actual: options,
        possible: {
          ignoreAttributes: [_.isString]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    function checkSelector(selectorNode, ruleNode) {
      const count = selectorNode.reduce((total, childNode) => {
        // Only traverse inside actual selectors and :not()
        if (childNode.type === "selector" || childNode.value === ":not") {
          checkSelector(childNode, ruleNode);
        }

        if (childNode.type !== "attribute") {
          // Not an attribute node -> ignore
          return total;
        }
        if (optionsMatches(options, "ignoreAttributes", childNode.attribute)) {
          // it's an attribute that is supposed to be ignored
          return total;
        }

        return (total += 1);
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
