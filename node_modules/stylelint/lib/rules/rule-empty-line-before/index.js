"use strict";

const addEmptyLineBefore = require("../../utils/addEmptyLineBefore");
const getPreviousNonSharedLineCommentNode = require("../../utils/getPreviousNonSharedLineCommentNode");
const hasEmptyLine = require("../../utils/hasEmptyLine");
const isAfterSingleLineComment = require("../../utils/isAfterSingleLineComment");
const isFirstNested = require("../../utils/isFirstNested");
const isFirstNodeOfRoot = require("../../utils/isFirstNodeOfRoot");
const isSingleLineString = require("../../utils/isSingleLineString");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const optionsMatches = require("../../utils/optionsMatches");
const removeEmptyLinesBefore = require("../../utils/removeEmptyLinesBefore");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "rule-empty-line-before";

const messages = ruleMessages(ruleName, {
  expected: "Expected empty line before rule",
  rejected: "Unexpected empty line before rule"
});

const rule = function(expectation, options, context) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: expectation,
        possible: ["always", "never", "always-multi-line", "never-multi-line"]
      },
      {
        actual: options,
        possible: {
          ignore: ["after-comment", "first-nested", "inside-block"],
          except: [
            "after-rule",
            "after-single-line-comment",
            "first-nested",
            "inside-block-and-after-rule",
            "inside-block"
          ]
        },
        optional: true
      }
    );

    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }

      // Ignore the first node
      if (isFirstNodeOfRoot(rule)) {
        return;
      }

      // Optionally ignore the expectation if a comment precedes this node
      if (
        optionsMatches(options, "ignore", "after-comment") &&
        rule.prev() &&
        rule.prev().type === "comment"
      ) {
        return;
      }

      // Optionally ignore the node if it is the first nested
      if (
        optionsMatches(options, "ignore", "first-nested") &&
        isFirstNested(rule)
      ) {
        return;
      }

      const isNested = rule.parent.type !== "root";

      // Optionally ignore the expectation if inside a block
      if (optionsMatches(options, "ignore", "inside-block") && isNested) {
        return;
      }

      // Ignore if the expectation is for multiple and the rule is single-line
      if (
        expectation.indexOf("multi-line") !== -1 &&
        isSingleLineString(rule.toString())
      ) {
        return;
      }

      let expectEmptyLineBefore =
        expectation.indexOf("always") !== -1 ? true : false;

      // Optionally reverse the expectation if any exceptions apply
      if (
        (optionsMatches(options, "except", "first-nested") &&
          isFirstNested(rule)) ||
        (optionsMatches(options, "except", "after-rule") &&
          isAfterRule(rule)) ||
        (optionsMatches(options, "except", "inside-block-and-after-rule") &&
          isNested &&
          isAfterRule(rule)) ||
        (optionsMatches(options, "except", "after-single-line-comment") &&
          isAfterSingleLineComment(rule)) ||
        (optionsMatches(options, "except", "inside-block") && isNested)
      ) {
        expectEmptyLineBefore = !expectEmptyLineBefore;
      }

      const hasEmptyLineBefore = hasEmptyLine(rule.raws.before);

      // Return if the expectation is met
      if (expectEmptyLineBefore === hasEmptyLineBefore) {
        return;
      }

      // Fix
      if (context.fix) {
        if (expectEmptyLineBefore) {
          addEmptyLineBefore(rule, context.newline);
        } else {
          removeEmptyLinesBefore(rule, context.newline);
        }

        return;
      }

      const message = expectEmptyLineBefore
        ? messages.expected
        : messages.rejected;

      report({
        message,
        node: rule,
        result,
        ruleName
      });
    });
  };
};

function isAfterRule(rule) {
  const prevNode = getPreviousNonSharedLineCommentNode(rule);
  return prevNode && prevNode.type === "rule";
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
