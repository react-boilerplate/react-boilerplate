"use strict";

const _ = require("lodash");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "at-rule-blacklist";

const messages = ruleMessages(ruleName, {
  rejected: name => `Unexpected at-rule "${name}"`
});

const rule = function(blacklistInput) {
  // To allow for just a string as a parameter (not only arrays of strings)
  const blacklist = [].concat(blacklistInput);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: blacklist,
      possible: [_.isString]
    });
    if (!validOptions) {
      return;
    }

    root.walkAtRules(atRule => {
      const name = atRule.name;

      if (
        blacklist.indexOf(postcss.vendor.unprefixed(name).toLowerCase()) === -1
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
