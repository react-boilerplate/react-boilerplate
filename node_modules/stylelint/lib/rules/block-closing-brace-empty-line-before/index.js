"use strict";

const blockString = require("../../utils/blockString");
const hasBlock = require("../../utils/hasBlock");
const hasEmptyBlock = require("../../utils/hasEmptyBlock");
const hasEmptyLine = require("../../utils/hasEmptyLine");
const isSingleLineString = require("../../utils/isSingleLineString");
const optionsMatches = require("../../utils/optionsMatches");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "block-closing-brace-empty-line-before";

const messages = ruleMessages(ruleName, {
  expected: "Expected empty line before closing brace",
  rejected: "Unexpected empty line before closing brace"
});

const rule = function(expectation, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: expectation,
        possible: ["always-multi-line", "never"]
      },
      {
        actual: options,
        possible: {
          except: ["after-closing-brace"]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    // Check both kinds of statements: rules and at-rules
    root.walkRules(check);
    root.walkAtRules(check);

    function check(statement) {
      // Return early if blockless or has empty block
      if (!hasBlock(statement) || hasEmptyBlock(statement)) {
        return;
      }

      // Get whitespace after ""}", ignoring extra semicolon
      const before = (statement.raws.after || "").replace(/;+/, "");
      if (before === undefined) {
        return;
      }

      // Calculate index
      const statementString = statement.toString();
      let index = statementString.length - 1;
      if (statementString[index - 1] === "\r") {
        index -= 1;
      }

      // Set expectation
      const expectEmptyLineBefore = (() => {
        const childNodeTypes = statement.nodes.map(item => item.type);

        // Reverse the primary options if `after-closing-brace` is set
        if (
          optionsMatches(options, "except", "after-closing-brace") &&
          (statement.type === "atrule" && childNodeTypes.indexOf("decl") === -1)
        ) {
          return expectation === "never" ? true : false;
        }

        return expectation === "always-multi-line" &&
          !isSingleLineString(blockString(statement))
          ? true
          : false;
      })();

      // Check for at least one empty line
      const hasEmptyLineBefore = hasEmptyLine(before);

      // Return if the expectation is met
      if (expectEmptyLineBefore === hasEmptyLineBefore) {
        return;
      }

      const message = expectEmptyLineBefore
        ? messages.expected
        : messages.rejected;

      report({
        message,
        result,
        ruleName,
        node: statement,
        index
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
