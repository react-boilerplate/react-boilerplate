"use strict";

const _ = require("lodash");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const keywordSets = require("../../reference/keywordSets");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-pseudo-element-colon-notation";

const messages = ruleMessages(ruleName, {
  expected: q => `Expected ${q} colon pseudo-element notation`
});

const rule = function(expectation, options, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["single", "double"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      const selector = rule.selector;

      // get out early if no pseudo elements or classes
      if (selector.indexOf(":") === -1) {
        return;
      }

      const fixPositions = [];

      // match only level 1 and 2 pseudo elements
      const pseudoElementsWithColons = _.toArray(
        keywordSets.levelOneAndTwoPseudoElements
      ).map(x => `:${x}`);
      styleSearch(
        { source: selector.toLowerCase(), target: pseudoElementsWithColons },
        match => {
          const prevCharIsColon = selector[match.startIndex - 1] === ":";

          if (expectation === "single" && !prevCharIsColon) {
            return;
          }
          if (expectation === "double" && prevCharIsColon) {
            return;
          }

          if (context.fix) {
            fixPositions.unshift({ rule, startIndex: match.startIndex });
            return;
          }

          report({
            message: messages.expected(expectation),
            node: rule,
            index: match.startIndex,
            result,
            ruleName
          });
        }
      );

      if (fixPositions.length) {
        // If expecting : then we found :: so remove one of the colons
        // If expecting :: then we found : so add one extra colon
        const expectedSingle = expectation === "single";
        const offset = expectedSingle ? 1 : 0;
        const extraColon = expectedSingle ? "" : ":";

        fixPositions.forEach(function(fixPosition) {
          rule.selector =
            rule.selector.substring(0, fixPosition.startIndex - offset) +
            extraColon +
            rule.selector.substring(fixPosition.startIndex);
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
