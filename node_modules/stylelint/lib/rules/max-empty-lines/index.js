"use strict";

const _ = require("lodash");
const eachRoot = require("../../utils/eachRoot");
const optionsMatches = require("../../utils/optionsMatches");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "max-empty-lines";

const messages = ruleMessages(ruleName, {
  expected: max =>
    `Expected no more than ${max} empty ${max === 1 ? "line" : "lines"}`
});

const rule = function(max, options) {
  let emptyLines = 0;
  let lastIndex = -1;

  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: max,
        possible: _.isNumber
      },
      {
        actual: options,
        possible: {
          ignore: ["comments"]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    const ignoreComments = optionsMatches(options, "ignore", "comments");

    eachRoot(root, checkRoot);

    function checkRoot(root) {
      const rootString = root.toString();
      styleSearch(
        {
          source: rootString,
          target: /\r\n/.test(rootString) ? "\r\n" : "\n",
          comments: ignoreComments ? "skip" : "check"
        },
        match => {
          checkMatch(rootString, match.startIndex, match.endIndex, root);
        }
      );
    }

    function checkMatch(source, matchStartIndex, matchEndIndex, node) {
      const eof = matchEndIndex === source.length ? true : false;
      let violation = false;

      // Additional check for beginning of file
      if (!matchStartIndex || lastIndex === matchStartIndex) {
        emptyLines++;
      } else {
        emptyLines = 0;
      }

      lastIndex = matchEndIndex;

      if (emptyLines > max) violation = true;

      if (!eof && !violation) return;

      if (violation) {
        report({
          message: messages.expected(max),
          node,
          index: matchStartIndex,
          result,
          ruleName
        });
      }

      // Additional check for end of file
      if (eof) {
        emptyLines++;

        if (emptyLines > max) {
          report({
            message: messages.expected(max),
            node,
            index: matchEndIndex,
            result,
            ruleName
          });
        }
      }
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
