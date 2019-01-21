"use strict";

const _ = require("lodash");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-max-empty-lines";

const messages = ruleMessages(ruleName, {
  expected: max =>
    `Expected no more than ${max} empty ${max === 1 ? "line" : "lines"}`
});

const rule = function(max) {
  const maxAdjacentNewlines = max + 1;

  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: max,
      possible: _.isNumber
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      const selector = rule.raws.selector
        ? rule.raws.selector.raw
        : rule.selector;
      const repeatLFNewLines = _.repeat("\n", maxAdjacentNewlines);
      const repeatCRLFNewLines = _.repeat("\r\n", maxAdjacentNewlines);

      styleSearch({ source: selector, target: "\n" }, match => {
        if (
          selector.substr(match.startIndex + 1, maxAdjacentNewlines) ===
            repeatLFNewLines ||
          selector.substr(match.startIndex + 1, maxAdjacentNewlines * 2) ===
            repeatCRLFNewLines
        ) {
          // Put index at `\r` if it's CRLF, otherwise leave it at `\n`
          let index = match.startIndex;
          if (selector[index - 1] === "\r") {
            index -= 1;
          }

          report({
            message: messages.expected(max),
            node: rule,
            index,
            result,
            ruleName
          });
        }
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
