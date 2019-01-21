"use strict";

const _ = require("lodash");
const isKeyframeSelector = require("../../utils/isKeyframeSelector");
const isOnlyWhitespace = require("../../utils/isOnlyWhitespace");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const optionsMatches = require("../../utils/optionsMatches");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const resolvedNestedSelector = require("postcss-resolve-nested-selector");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-max-type";

const messages = ruleMessages(ruleName, {
  expected: (selector, max) =>
    `Expected "${selector}" to have no more than ${max} type ${
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
        possible(max) {
          return typeof max === "number" && max >= 0;
        }
      },
      {
        actual: options,
        possible: {
          ignore: ["descendant", "child", "compounded"],
          ignoreTypes: [_.isString]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    const ignoreDescendant = optionsMatches(options, "ignore", "descendant");
    const ignoreChild = optionsMatches(options, "ignore", "child");
    const ignoreCompounded = optionsMatches(options, "ignore", "compounded");

    function checkSelector(selectorNode, ruleNode) {
      const count = selectorNode.reduce((total, childNode) => {
        // Only traverse inside actual selectors and :not()
        if (childNode.type === "selector" || childNode.value === ":not") {
          checkSelector(childNode, ruleNode);
        }

        if (optionsMatches(options, "ignoreTypes", childNode.value)) {
          return total;
        }

        if (ignoreDescendant && hasDescendantCombinatorBefore(childNode)) {
          return total;
        }

        if (ignoreChild && hasChildCombinatorBefore(childNode)) {
          return total;
        }

        if (ignoreCompounded && hasCompoundSelector(childNode)) {
          return total;
        }

        return (total += childNode.type === "tag" ? 1 : 0);
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
      const selector = ruleNode.selector;
      const selectors = ruleNode.selectors;

      if (!isStandardSyntaxRule(ruleNode)) {
        return;
      }
      if (!isStandardSyntaxSelector(selector)) {
        return;
      }
      if (selectors.some(s => isKeyframeSelector(s))) {
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
          if (!isStandardSyntaxSelector(resolvedSelector)) {
            return;
          }
          parseSelector(resolvedSelector, result, ruleNode, container =>
            checkSelector(container, ruleNode)
          );
        });
      });
    });
  };
}

function hasDescendantCombinatorBefore(node) {
  const nodeIndex = node.parent.nodes.indexOf(node);
  return node.parent.nodes.slice(0, nodeIndex).some(isDescendantCombinator);
}

function hasChildCombinatorBefore(node) {
  const nodeIndex = node.parent.nodes.indexOf(node);
  return node.parent.nodes.slice(0, nodeIndex).some(isChildCombinator);
}

function hasCompoundSelector(node) {
  if (node.prev() && !isCombinator(node.prev())) {
    return true;
  }
  if (node.next() && !isCombinator(node.next())) {
    return true;
  }
  return false;
}

function isCombinator(node) {
  if (!node) return false;
  return _.get(node, "type") === "combinator";
}

function isDescendantCombinator(node) {
  if (!node) return false;
  return isCombinator(node) && isOnlyWhitespace(node.value);
}

function isChildCombinator(node) {
  if (!node) return false;
  return isCombinator(node) && node.value.includes(">");
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
