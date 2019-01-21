"use strict";

const _ = require("lodash");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "declaration-property-value-blacklist";

const messages = ruleMessages(ruleName, {
  rejected: (property, value) =>
    `Unexpected value "${value}" for property "${property}"`
});

const rule = function(blacklist) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: blacklist,
      possible: [_.isObject]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const prop = decl.prop;
      const value = decl.value;

      const unprefixedProp = postcss.vendor.unprefixed(prop);
      const propBlacklist = _.find(blacklist, (list, propIdentifier) =>
        matchesStringOrRegExp(unprefixedProp, propIdentifier)
      );

      if (_.isEmpty(propBlacklist)) {
        return;
      }

      if (!matchesStringOrRegExp(value, propBlacklist)) {
        return;
      }

      report({
        message: messages.rejected(prop, value),
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
