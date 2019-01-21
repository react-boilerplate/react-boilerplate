"use strict";

const blurFunctionArguments = require("../../utils/blurFunctionArguments");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "color-hex-length";

const messages = ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const rule = function(expectation, _, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["short", "long"]
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

        if (
          expectation === "long" &&
          hexValue.length !== 4 &&
          hexValue.length !== 5
        ) {
          return;
        }

        if (
          expectation === "short" &&
          (hexValue.length < 6 || !canShrink(hexValue))
        ) {
          return;
        }

        const variant = expectation === "long" ? longer : shorter;
        const expectedHex = variant(hexValue);

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

function canShrink(hex) {
  hex = hex.toLowerCase();

  return (
    hex[1] === hex[2] &&
    hex[3] === hex[4] &&
    hex[5] === hex[6] &&
    (hex.length === 7 || (hex.length === 9 && hex[7] === hex[8]))
  );
}

function shorter(hex) {
  let hexVariant = "#";
  for (let i = 1; i < hex.length; i = i + 2) {
    hexVariant += hex[i];
  }
  return hexVariant;
}

function longer(hex) {
  let hexVariant = "#";
  for (let i = 1; i < hex.length; i++) {
    hexVariant += hex[i] + hex[i];
  }
  return hexVariant;
}

function replaceHex(input, searchString, replaceString, startIndex) {
  const offset = startIndex + 1;
  const stringStart = input.slice(0, offset);
  const stringEnd = input.slice(offset + searchString.length);

  return stringStart + replaceString + stringEnd;
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
