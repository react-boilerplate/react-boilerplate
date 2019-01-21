"use strict";

const _ = require("lodash");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const isStandardSyntaxFunction = require("../../utils/isStandardSyntaxFunction");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueParser = require("postcss-value-parser");

const ruleName = "function-blacklist";

const messages = ruleMessages(ruleName, {
  rejected: name => `Unexpected function "${name}"`
});

const rule = function(blacklist) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: blacklist,
      possible: [_.isString]
    });
    if (!validOptions) {
      return;
    }
    root.walkDecls(decl => {
      const value = decl.value;

      valueParser(value).walk(function(node) {
        if (node.type !== "function") {
          return;
        }
        if (!isStandardSyntaxFunction(node)) {
          return;
        }
        if (
          !matchesStringOrRegExp(
            postcss.vendor.unprefixed(node.value),
            blacklist
          )
        ) {
          return;
        }

        report({
          message: messages.rejected(node.value),
          node: decl,
          index: declarationValueIndex(decl) + node.sourceIndex,
          result,
          ruleName
        });
      });
    });
  };
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
