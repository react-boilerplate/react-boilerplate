"use strict";

const eachRoot = require("../../utils/eachRoot");
const isOnlyWhitespace = require("../../utils/isOnlyWhitespace");
const optionsMatches = require("../../utils/optionsMatches");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "no-eol-whitespace";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected whitespace at end of line"
});

const whitespacesToReject = new Set([" ", "\t"]);

const rule = function(on, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: on
      },
      {
        optional: true,
        actual: options,
        possible: {
          ignore: ["empty-lines"]
        }
      }
    );
    if (!validOptions) {
      return;
    }

    eachRoot(root, checkRoot);

    function checkRoot(root) {
      const rootString = root.source.input.css;

      styleSearch(
        {
          source: rootString,
          target: ["\n", "\r"],
          comments: "check"
        },
        match => {
          // If the character before newline is not whitespace, ignore
          if (!whitespacesToReject.has(rootString[match.startIndex - 1])) {
            return;
          }

          if (optionsMatches(options, "ignore", "empty-lines")) {
            // If there is only whitespace between the previous newline and
            // this newline, ignore
            const lineBefore = rootString.substring(
              match.startIndex + 1,
              rootString.lastIndexOf("\n", match.startIndex - 1)
            );
            if (isOnlyWhitespace(lineBefore)) {
              return;
            }
          }

          report({
            message: messages.rejected,
            node: root,
            index: match.startIndex - 1,
            result,
            ruleName
          });
        }
      );
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
