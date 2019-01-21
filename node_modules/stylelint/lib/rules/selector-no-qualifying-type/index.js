"use strict";

const isKeyframeRule = require("../../utils/isKeyframeRule");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const optionsMatches = require("../../utils/optionsMatches");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const resolvedNestedSelector = require("postcss-resolve-nested-selector");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-no-qualifying-type";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected qualifying type selector"
});

const selectorCharacters = ["#", ".", "["];

function isSelectorCharacters(value) {
  return selectorCharacters.some(char => value.indexOf(char) !== -1);
}

function getRightNodes(node) {
  const result = [];
  let rightNode = node;

  while ((rightNode = rightNode.next())) {
    if (rightNode.type === "combinator") {
      break;
    }
    if (
      rightNode.type !== "id" &&
      rightNode.type !== "class" &&
      rightNode.type !== "attribute"
    ) {
      continue;
    }

    result.push(rightNode);
  }

  return result;
}

const rule = function(enabled, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: enabled,
        possible: [true, false]
      },
      {
        actual: options,
        possible: {
          ignore: ["attribute", "class", "id"]
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
      if (isKeyframeRule(rule)) {
        return;
      }
      // Increasing performance
      if (!isStandardSyntaxSelector(rule.selector)) {
        return;
      }
      if (!isSelectorCharacters(rule.selector)) {
        return;
      }

      function checkSelector(selectorAST) {
        selectorAST.walkTags(selector => {
          const selectorParent = selector.parent;

          if (selectorParent.nodes.length === 1) {
            return;
          }

          const selectorNodes = getRightNodes(selector);
          const index = selector.sourceIndex;

          selectorNodes.forEach(selectorNode => {
            if (
              selectorNode.type === "id" &&
              !optionsMatches(options, "ignore", "id")
            ) {
              complain(index);
            }

            if (
              selectorNode.type === "class" &&
              !optionsMatches(options, "ignore", "class")
            ) {
              complain(index);
            }

            if (
              selectorNode.type === "attribute" &&
              !optionsMatches(options, "ignore", "attribute")
            ) {
              complain(index);
            }
          });
        });
      }

      resolvedNestedSelector(rule.selector, rule).forEach(resolvedSelector => {
        if (!isStandardSyntaxSelector(resolvedSelector)) {
          return;
        }

        parseSelector(resolvedSelector, result, rule, checkSelector);
      });

      function complain(index) {
        report({
          ruleName,
          result,
          node: rule,
          message: messages.rejected,
          index
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
