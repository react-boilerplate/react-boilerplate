"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-attribute-brackets-space-inside";

const messages = ruleMessages(ruleName, {
  expectedOpening: 'Expected single space after "["',
  rejectedOpening: 'Unexpected whitespace after "["',
  expectedClosing: 'Expected single space before "]"',
  rejectedClosing: 'Unexpected whitespace before "]"'
});

const rule = function(expectation) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      if (rule.selector.indexOf("[") === -1) {
        return;
      }

      parseSelector(rule.selector, result, rule, selectorTree => {
        selectorTree.walkAttributes(attributeNode => {
          const attributeSelectorString = attributeNode.toString();

          styleSearch(
            { source: attributeSelectorString, target: "[" },
            match => {
              const nextCharIsSpace =
                attributeSelectorString[match.startIndex + 1] === " ";
              const index = attributeNode.sourceIndex + match.startIndex + 1;
              if (nextCharIsSpace && expectation === "never") {
                complain(messages.rejectedOpening, index);
              }
              if (!nextCharIsSpace && expectation === "always") {
                complain(messages.expectedOpening, index);
              }
            }
          );

          styleSearch(
            { source: attributeSelectorString, target: "]" },
            match => {
              const prevCharIsSpace =
                attributeSelectorString[match.startIndex - 1] === " ";
              const index = attributeNode.sourceIndex + match.startIndex - 1;
              if (prevCharIsSpace && expectation === "never") {
                complain(messages.rejectedClosing, index);
              }
              if (!prevCharIsSpace && expectation === "always") {
                complain(messages.expectedClosing, index);
              }
            }
          );
        });
      });

      function complain(message, index) {
        report({
          message,
          index,
          result,
          ruleName,
          node: rule
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
