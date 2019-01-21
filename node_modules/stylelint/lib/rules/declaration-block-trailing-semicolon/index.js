"use strict";

const hasBlock = require("../../utils/hasBlock");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "declaration-block-trailing-semicolon";

const messages = ruleMessages(ruleName, {
  expected: "Expected a trailing semicolon",
  rejected: "Unexpected trailing semicolon"
});

const rule = function(expectation, _, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(atRule => {
      if (atRule.parent === root) {
        return;
      }
      if (atRule !== atRule.parent.last) {
        return;
      }
      if (hasBlock(atRule)) {
        return;
      }
      checkLastNode(atRule);
    });

    root.walkDecls(decl => {
      if (decl !== decl.parent.last) {
        return;
      }
      checkLastNode(decl);
    });

    function checkLastNode(node) {
      let message;

      if (expectation === "always") {
        if (node.parent.raws.semicolon) {
          return;
        }

        // auto-fix
        if (context.fix) {
          node.parent.raws.semicolon = true;
          if (node.type === "atrule") {
            node.raws.between = "";
            node.parent.raws.after = " ";
          }
          return;
        }

        message = messages.expected;
      } else if (expectation === "never") {
        if (!node.parent.raws.semicolon) {
          return;
        }

        // auto-fix
        if (context.fix) {
          node.parent.raws.semicolon = false;
          return;
        }

        message = messages.rejected;
      }

      report({
        message,
        node,
        index: node.toString().trim().length - 1,
        result,
        ruleName
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
