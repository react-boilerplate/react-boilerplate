"use strict";

const blockString = require("../../utils/blockString");
const rawNodeString = require("../../utils/rawNodeString");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "declaration-block-semicolon-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected single space after ";"',
  rejectedAfter: () => 'Unexpected whitespace after ";"',
  expectedAfterSingleLine: () =>
    'Expected single space after ";" in a single-line declaration block',
  rejectedAfterSingleLine: () =>
    'Unexpected whitespace after ";" in a single-line declaration block'
});

const rule = function(expectation) {
  const checker = whitespaceChecker("space", expectation, messages);

  return function(root, result) {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never", "always-single-line", "never-single-line"]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(function(decl) {
      // Ignore last declaration if there's no trailing semicolon
      const parentRule = decl.parent;
      if (!parentRule.raws.semicolon && parentRule.last === decl) {
        return;
      }

      const nextDecl = decl.next();
      if (!nextDecl) {
        return;
      }

      checker.after({
        source: rawNodeString(nextDecl),
        index: -1,
        lineCheckStr: blockString(parentRule),
        err: m => {
          report({
            message: m,
            node: decl,
            index: decl.toString().length + 1,
            result,
            ruleName
          });
        }
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
