"use strict";

const functionCommaSpaceChecker = require("../functionCommaSpaceChecker");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "function-comma-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected single space after ","',
  rejectedAfter: () => 'Unexpected whitespace after ","',
  expectedAfterSingleLine: () =>
    'Expected single space after "," in a single-line function',
  rejectedAfterSingleLine: () =>
    'Unexpected whitespace after "," in a single-line function'
});

const rule = function(expectation, options, context) {
  const checker = whitespaceChecker("space", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never", "always-single-line", "never-single-line"]
    });
    if (!validOptions) {
      return;
    }

    functionCommaSpaceChecker({
      root,
      result,
      locationChecker: checker.after,
      checkedRuleName: ruleName,
      fix: context.fix
        ? (div, index, nodes) => {
            if (expectation.indexOf("always") === 0) {
              div.after = " ";
              return true;
            } else if (expectation.indexOf("never") === 0) {
              div.after = "";
              for (let i = index + 1; i < nodes.length; i++) {
                const node = nodes[i];
                if (node.type === "comment") {
                  continue;
                }
                if (node.type === "space") {
                  node.value = "";
                  continue;
                }
                break;
              }
              return true;
            }
          }
        : null
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
