"use strict";

const _ = require("lodash");
const findAtRuleContext = require("../../utils/findAtRuleContext");
const isKeyframeRule = require("../../utils/isKeyframeRule");
const nodeContextLookup = require("../../utils/nodeContextLookup");
const normalizeSelector = require("normalize-selector");
const report = require("../../utils/report");
const resolvedNestedSelector = require("postcss-resolve-nested-selector");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "no-duplicate-selectors";

const messages = ruleMessages(ruleName, {
  rejected: (selector, firstDuplicateLine) =>
    `Unexpected duplicate selector "${selector}", first used at line ${firstDuplicateLine}`
});

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    // The top level of this map will be rule sources.
    // Each source maps to another map, which maps rule parents to a set of selectors.
    // This ensures that selectors are only checked against selectors
    // from other rules that share the same parent and the same source.
    const selectorContextLookup = nodeContextLookup();

    root.walkRules(rule => {
      if (isKeyframeRule(rule)) {
        return;
      }

      const contextSelectorSet = selectorContextLookup.getContext(
        rule,
        findAtRuleContext(rule)
      );
      const resolvedSelectors = rule.selectors.reduce((result, selector) => {
        return _.union(result, resolvedNestedSelector(selector, rule));
      }, []);
      const normalizedSelectorList = resolvedSelectors.map(normalizeSelector);
      const selectorLine = rule.source.start.line;

      // Complain if the same selector list occurs twice

      // Sort the selectors list so that the order of the constituents
      // doesn't matter
      const sortedSelectorList = normalizedSelectorList
        .slice()
        .sort()
        .join(",");
      if (contextSelectorSet.has(sortedSelectorList)) {
        // If the selector isn't nested we can use its raw value; otherwise,
        // we have to approximate something for the message -- which is close enough
        const isNestedSelector =
          resolvedSelectors.join(",") !== rule.selectors.join(",");
        const selectorForMessage = isNestedSelector
          ? resolvedSelectors.join(", ")
          : rule.selector;
        const previousDuplicatePosition = contextSelectorSet.get(
          sortedSelectorList
        );

        return report({
          result,
          ruleName,
          node: rule,
          message: messages.rejected(
            selectorForMessage,
            previousDuplicatePosition
          )
        });
      }

      contextSelectorSet.set(sortedSelectorList, selectorLine);

      // Or complain if one selector list contains the same selector more than one
      rule.selectors.forEach((selector, i) => {
        if (
          _.includes(
            normalizedSelectorList.slice(0, i),
            normalizeSelector(selector)
          )
        ) {
          report({
            result,
            ruleName,
            node: rule,
            message: messages.rejected(selector, selectorLine)
          });
        }
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
