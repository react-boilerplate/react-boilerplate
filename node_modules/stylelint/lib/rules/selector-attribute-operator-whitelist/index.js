"use strict";

const _ = require("lodash");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-attribute-operator-whitelist";

const messages = ruleMessages(ruleName, {
  rejected: operator => `Unexpected operator "${operator}"`
});

const rule = function(whitelistInput) {
  const whitelist = [].concat(whitelistInput);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: whitelist,
      possible: [_.isString]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      if (
        rule.selector.indexOf("[") === -1 ||
        rule.selector.indexOf("=") === -1
      ) {
        return;
      }

      parseSelector(rule.selector, result, rule, selectorTree => {
        selectorTree.walkAttributes(attributeNode => {
          const operator = attributeNode.operator;

          if (!operator || (operator && whitelist.indexOf(operator) !== -1)) {
            return;
          }

          report({
            message: messages.rejected(operator),
            node: rule,
            index:
              attributeNode.sourceIndex + attributeNode.offsetOf("operator"),
            result,
            ruleName
          });
        });
      });
    });
  };
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
