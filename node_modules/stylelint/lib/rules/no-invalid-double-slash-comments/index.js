"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "no-invalid-double-slash-comments";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected double-slash CSS comment"
});

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      if (decl.prop.indexOf("//") === 0) {
        report({
          message: messages.rejected,
          node: decl,
          result,
          ruleName
        });
      }
    });
    root.walkRules(rule => {
      rule.selectors.forEach(selector => {
        if (selector.indexOf("//") === 0) {
          report({
            message: messages.rejected,
            node: rule,
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
