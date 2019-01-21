"use strict";

const isValidHex = require("../../utils/isValidHex");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "color-no-invalid-hex";

const messages = ruleMessages(ruleName, {
  rejected: hex => `Unexpected invalid hex color "${hex}"`
});

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const declString = decl.toString();

      styleSearch({ source: declString, target: "#" }, match => {
        // If there's not a colon, comma, or whitespace character before, we'll assume this is
        // not intended to be a hex color, but is instead something like the
        // hash in a url() argument
        if (!/[:,\s]/.test(declString[match.startIndex - 1])) {
          return;
        }

        const hexMatch = /^#[0-9A-Za-z]+/.exec(
          declString.substr(match.startIndex)
        );
        if (!hexMatch) {
          return;
        }

        const hexValue = hexMatch[0];
        if (isValidHex(hexValue)) {
          return;
        }

        report({
          message: messages.rejected(hexValue),
          node: decl,
          index: match.startIndex,
          result,
          ruleName
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
