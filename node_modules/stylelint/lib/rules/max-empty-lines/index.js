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
  const maxAdjacentNewlines = max + 1;

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

    const repeatLFNewLines = _.repeat("\n", maxAdjacentNewlines);
    const repeatCRLFNewLines = _.repeat("\r\n", maxAdjacentNewlines);
    const ignoreComments = optionsMatches(options, "ignore", "comments");

    eachRoot(root, checkRoot);

    // We must check comments separately in order to accommodate stupid
    // `//`-comments from SCSS, which postcss-scss converts to `/* ... */`,
    // which adds to extra characters at the end, which messes up our
    // warning position
    if (!ignoreComments) {
      root.walkComments(comment => {
        const source =
          (comment.raws.left || "") + comment.text + (comment.raws.right || "");
        styleSearch({ source, target: "\n" }, match => {
          checkMatch(source, match.endIndex, comment, 2);
        });
      });
    }

    function checkRoot(root) {
      const rootString = root.toString();
      styleSearch({ source: rootString, target: "\n" }, match => {
        checkMatch(rootString, match.endIndex, root);
      });
    }

    function checkMatch(source, matchEndIndex, node) {
      const offset =
        arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      let violationIndex = false;
      if (
        source.substr(matchEndIndex, maxAdjacentNewlines) === repeatLFNewLines
      ) {
        violationIndex = matchEndIndex + maxAdjacentNewlines;
      } else if (
        source.substr(matchEndIndex, maxAdjacentNewlines * 2) ===
        repeatCRLFNewLines
      ) {
        violationIndex = matchEndIndex + maxAdjacentNewlines * 2;
      }

      if (!violationIndex) {
        return;
      }

      report({
        message: messages.expected(max),
        node,
        index: violationIndex + offset,
        result,
        ruleName
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
