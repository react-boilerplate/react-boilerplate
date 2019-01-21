"use strict";

const eachRoot = require("../../utils/eachRoot");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "no-empty-first-line";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected empty line"
});

const rule = function(actual, _, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    eachRoot(root, function(root) {
      if (root.source.inline || root.source.lang === "object-literal") {
        return;
      }
      const rootString = root.source.input.css;
      if (rootString.trim() === "") {
        return;
      }

      const noEmptyFirstLineTest = RegExp(/^(\s*\r?\n)+/g);

      if (noEmptyFirstLineTest.test(rootString)) {
        if (context.fix) {
          root.nodes[0].raws.before = "";
          return;
        }

        report({
          message: messages.rejected,
          node: root,
          result,
          ruleName
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
