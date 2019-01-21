"use strict";

const _ = require("lodash");
const isCustomProperty = require("../../utils/isCustomProperty");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "custom-property-pattern";

const messages = ruleMessages(ruleName, {
  expected: "Expected custom property name to match specified pattern"
});

const rule = function(pattern) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: pattern,
      possible: [_.isRegExp, _.isString]
    });
    if (!validOptions) {
      return;
    }

    const regexpPattern = _.isString(pattern) ? new RegExp(pattern) : pattern;

    root.walkDecls(decl => {
      const prop = decl.prop;

      if (!isCustomProperty(prop)) {
        return;
      }
      if (regexpPattern.test(prop.slice(2))) {
        return;
      }

      report({
        message: messages.expected,
        node: decl,
        result,
        ruleName
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
