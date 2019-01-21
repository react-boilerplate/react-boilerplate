"use strict";

const _ = require("lodash");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "function-max-empty-lines";

const messages = ruleMessages(ruleName, {
  expected: max =>
    `Expected no more than ${max} empty ${max === 1 ? "line" : "lines"}`
});

const rule = function(max, options, context) {
  const maxAdjacentNewlines = max + 1;

  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: max,
      possible: _.isNumber
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      if (decl.value.indexOf("(") === -1) {
        return;
      }

      const declString = decl.toString();
      const repeatLFNewLines = _.repeat("\n", maxAdjacentNewlines);
      const repeatCRLFNewLines = _.repeat("\r\n", maxAdjacentNewlines);
      const matches = [];

      styleSearch(
        {
          source: declString,
          target: "\n",
          functionArguments: "only"
        },
        match => {
          if (
            declString.substr(match.startIndex + 1, maxAdjacentNewlines) ===
              repeatLFNewLines ||
            declString.substr(match.startIndex + 1, maxAdjacentNewlines * 2) ===
              repeatCRLFNewLines
          ) {
            // Put index at `\r` if it's CRLF, otherwise leave it at `\n`
            let index = match.startIndex;
            if (declString[index - 1] === "\r") {
              index -= 1;
            }

            if (context.fix) {
              matches.push({ start: index, end: match.endIndex });

              return;
            }

            report({
              message: messages.expected(max),
              node: decl,
              index,
              result,
              ruleName
            });
          }
        }
      );

      if (context.fix && matches.length) {
        matches.reverse().forEach(item => {
          const updatedValue = (
            decl.toString().substring(0, item.start) +
            decl.toString().substring(item.end)
          ).substring(declarationValueIndex(decl));

          if (decl.raws.value) {
            decl.raws.value.raw = updatedValue;
          } else {
            decl.value = updatedValue;
          }
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
