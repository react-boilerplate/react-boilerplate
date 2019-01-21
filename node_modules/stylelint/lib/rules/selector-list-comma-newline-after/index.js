"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "selector-list-comma-newline-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected newline after ","',
  expectedAfterMultiLine: () =>
    'Expected newline after "," in a multi-line list',
  rejectedAfterMultiLine: () =>
    'Unexpected whitespace after "," in a multi-line list'
});

const rule = function(expectation) {
  const checker = whitespaceChecker("newline", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line", "never-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      // Get raw selector so we can allow end-of-line comments, e.g.
      // a, /* comment */
      // b {}
      const selector = rule.raws.selector
        ? rule.raws.selector.raw
        : rule.selector;
      styleSearch(
        {
          source: selector,
          target: ",",
          functionArguments: "skip"
        },
        match => {
          const nextChars = selector.substr(
            match.endIndex,
            selector.length - match.endIndex
          );

          // If there's a // comment, that means there has to be a newline
          // ending the comment so we're fine
          if (nextChars.match(/^\s+\/\//)) {
            return;
          }

          // If there are spaces and then a comment begins, look for the newline
          const indextoCheckAfter = nextChars.match(/^\s+\/\*/)
            ? selector.indexOf("*/", match.endIndex) + 1
            : match.startIndex;
          checker.afterOneOnly({
            source: selector,
            index: indextoCheckAfter,
            err: m =>
              report({
                message: m,
                node: rule,
                index: match.startIndex,
                result,
                ruleName
              })
          });
        }
      );
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
