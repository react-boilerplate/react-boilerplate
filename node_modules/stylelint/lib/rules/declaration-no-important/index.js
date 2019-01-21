"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "declaration-no-important";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected !important"
});

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      if (!decl.important) {
        return;
      }

      report({
        message: messages.rejected,
        node: decl,
        word: "important",
        result,
        ruleName
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
