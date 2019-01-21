"use strict";

const beforeBlockString = require("../../utils/beforeBlockString");
const blockString = require("../../utils/blockString");
const hasBlock = require("../../utils/hasBlock");
const hasEmptyBlock = require("../../utils/hasEmptyBlock");
const nextNonCommentNode = require("../../utils/nextNonCommentNode");
const rawNodeString = require("../../utils/rawNodeString");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "block-opening-brace-newline-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected newline after "{"',
  expectedAfterMultiLine: () =>
    'Expected newline after "{" of a multi-line block',
  rejectedAfterMultiLine: () =>
    'Unexpected whitespace after "{" of a multi-line block'
});

const rule = function(expectation) {
  const checker = whitespaceChecker("newline", expectation, messages);

  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line", "never-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    // Check both kinds of statement: rules and at-rules
    root.walkRules(check);
    root.walkAtRules(check);

    function check(statement) {
      // Return early if blockless or has an empty block
      if (!hasBlock(statement) || hasEmptyBlock(statement)) {
        return;
      }

      // Allow an end-of-line comment
      const nodeToCheck = nextNonCommentNode(statement.first);
      if (!nodeToCheck) {
        return;
      }

      checker.afterOneOnly({
        source: rawNodeString(nodeToCheck),
        index: -1,
        lineCheckStr: blockString(statement),
        err: m => {
          report({
            message: m,
            node: statement,
            index:
              beforeBlockString(statement, { noRawBefore: true }).length + 1,
            result,
            ruleName
          });
        }
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
