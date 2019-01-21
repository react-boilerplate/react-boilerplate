"use strict";

const _ = require("lodash");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "at-rule-whitelist";

const messages = ruleMessages(ruleName, {
  rejected: name => `Unexpected at-rule "${name}"`
});

const rule = function(whitelistInput) {
  // To allow for just a string as a parameter (not only arrays of strings)
  const whitelist = [].concat(whitelistInput);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: whitelist,
      possible: [_.isString]
    });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(atRule => {
      const name = atRule.name;

      if (
        whitelist.indexOf(postcss.vendor.unprefixed(name).toLowerCase()) !== -1
      ) {
        return;
      }

      report({
        message: messages.rejected(name),
        node: atRule,
        result,
        ruleName
      });
    });
  };
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
