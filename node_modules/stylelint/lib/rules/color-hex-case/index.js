"use strict";

const blurFunctionArguments = require("../../utils/blurFunctionArguments");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "color-hex-case";

const messages = ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const rule = function(expectation, options, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["lower", "upper"]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const declString = blurFunctionArguments(decl.toString(), "url");
      const fixPositions = [];

      styleSearch({ source: declString, target: "#" }, match => {
        const hexMatch = /^#[0-9A-Za-z]+/.exec(
          declString.substr(match.startIndex)
        );
        if (!hexMatch) {
          return;
        }

        const hexValue = hexMatch[0];
        const hexValueLower = hexValue.toLowerCase();
        const hexValueUpper = hexValue.toUpperCase();
        const expectedHex =
          expectation === "lower" ? hexValueLower : hexValueUpper;

        if (hexValue === expectedHex) {
          return;
        }

        if (context.fix) {
          fixPositions.unshift({
            expectedHex,
            currentHex: hexValue,
            startIndex: match.startIndex
          });

          return;
        }

        report({
          message: messages.expected(hexValue, expectedHex),
          node: decl,
          index: match.startIndex,
          result,
          ruleName
        });
      });

      if (fixPositions.length) {
        const declProp = decl.prop;
        const declBetween = decl.raws.between;

        fixPositions.forEach(function(fixPosition) {
          // 1 — it's a # length
          decl.value = replaceHex(
            decl.value,
            fixPosition.currentHex,
            fixPosition.expectedHex,
            fixPosition.startIndex - declProp.length - declBetween.length - 1
          );
        });
      }
    });
  };
};

function replaceHex(input, searchString, replaceString, startIndex) {
  const offset = startIndex + 1;
  const stringStart = input.slice(0, offset);
  const stringEnd = input.slice(offset + searchString.length);

  return stringStart + replaceString + stringEnd;
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
