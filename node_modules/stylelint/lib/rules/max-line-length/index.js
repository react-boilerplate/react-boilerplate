"use strict";

const _ = require("lodash");
const eachRoot = require("../../utils/eachRoot");
const execall = require("execall");
const optionsMatches = require("../../utils/optionsMatches");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "max-line-length";

const messages = ruleMessages(ruleName, {
  expected: max =>
    `Expected line length to be no more than ${max} ${
      max === 1 ? "character" : "characters"
    }`
});

const rule = function(maxLength, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: maxLength,
        possible: _.isNumber
      },
      {
        actual: options,
        possible: {
          ignore: ["non-comments", "comments"],
          ignorePattern: [_.isString]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    const ignoreNonComments = optionsMatches(options, "ignore", "non-comments");
    const ignoreComments = optionsMatches(options, "ignore", "comments");

    eachRoot(root, checkRoot);

    function checkRoot(root) {
      const rootString = root.source.input.css;
      // Check first line
      checkNewline(rootString, { endIndex: 0 });
      // Check subsequent lines
      styleSearch(
        { source: rootString, target: ["\n"], comments: "check" },
        match => checkNewline(rootString, match)
      );
    }

    function complain(index) {
      report({
        index,
        result,
        ruleName,
        message: messages.expected(maxLength),
        node: root
      });
    }

    function checkNewline(rootString, match) {
      let nextNewlineIndex = rootString.indexOf("\n", match.endIndex);
      if (rootString[nextNewlineIndex - 1] === "\r") {
        nextNewlineIndex -= 1;
      }

      // Accommodate last line
      if (nextNewlineIndex === -1) {
        nextNewlineIndex = rootString.length;
      }

      const rawLineLength = nextNewlineIndex - match.endIndex;
      const lineText = rootString.slice(match.endIndex, nextNewlineIndex);

      // Case sensitive ignorePattern match
      if (optionsMatches(options, "ignorePattern", lineText)) {
        return;
      }

      const urlArgumentsLength = execall(/url\((.*)\)/gi, lineText).reduce(
        (result, match) => {
          return result + _.get(match, "sub[0].length", 0);
        },
        0
      );

      const importUrlsLength = execall(
        /@import\s+(['"].*['"])/gi,
        lineText
      ).reduce((result, match) => {
        return result + _.get(match, "sub[0].length", 0);
      }, 0);

      // If the line's length is less than or equal to the specified
      // max, ignore it ... So anything below is liable to be complained about.
      // **Note that the length of any url arguments or import urls
      // are excluded from the calculation.**
      if (rawLineLength - urlArgumentsLength - importUrlsLength <= maxLength) {
        return;
      }

      const complaintIndex = nextNewlineIndex - 1;

      if (ignoreComments) {
        if (match.insideComment) {
          return;
        }

        // This trimming business is to notice when the line starts a
        // comment but that comment is indented, e.g.
        //       /* something here */
        const nextTwoChars = rootString
          .slice(match.endIndex)
          .trim()
          .slice(0, 2);
        if (nextTwoChars === "/*" || nextTwoChars === "//") {
          return;
        }
      }

      if (ignoreNonComments) {
        if (match.insideComment) {
          return complain(complaintIndex);
        }

        // This trimming business is to notice when the line starts a
        // comment but that comment is indented, e.g.
        //       /* something here */
        const nextTwoChars = rootString
          .slice(match.endIndex)
          .trim()
          .slice(0, 2);
        if (nextTwoChars !== "/*" && nextTwoChars !== "//") {
          return;
        }
        return complain(complaintIndex);
      }

      // If there are no spaces besides initial (indent) spaces, ignore it
      const lineString = rootString.slice(match.endIndex, nextNewlineIndex);
      if (lineString.replace(/^\s+/, "").indexOf(" ") === -1) {
        return;
      }

      return complain(complaintIndex);
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
