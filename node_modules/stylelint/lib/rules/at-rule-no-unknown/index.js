"use strict";

const _ = require("lodash");
const keywordSets = require("../../reference/keywordSets");
const optionsMatches = require("../../utils/optionsMatches");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "at-rule-no-unknown";

const messages = ruleMessages(ruleName, {
  rejected: atRule => `Unexpected unknown at-rule "${atRule}"`
});

const rule = function(actual, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      { actual },
      {
        actual: options,
        possible: {
          ignoreAtRules: [_.isString]
        },
        optional: true
      }
    );

    if (!validOptions) {
      return;
    }

    root.walkAtRules(atRule => {
      const name = atRule.name;

      // Return early if at-rule is to be ignored
      if (optionsMatches(options, "ignoreAtRules", atRule.name)) {
        return;
      }

      if (
        postcss.vendor.prefix(name) ||
        keywordSets.atRules.has(name.toLowerCase())
      ) {
        return;
      }

      report({
        message: messages.rejected(`@${name}`),
        node: atRule,
        ruleName,
        result
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
