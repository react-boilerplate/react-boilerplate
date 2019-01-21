"use strict";

const _ = require("lodash");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "declaration-property-value-whitelist";

const messages = ruleMessages(ruleName, {
  rejected: (property, value) =>
    `Unexpected value "${value}" for property "${property}"`
});

const rule = function(whitelist) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: whitelist,
      possible: [_.isObject]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const prop = decl.prop;
      const value = decl.value;

      const unprefixedProp = postcss.vendor.unprefixed(prop);
      const propWhitelist = _.find(whitelist, (list, propIdentifier) =>
        matchesStringOrRegExp(unprefixedProp, propIdentifier)
      );

      if (_.isEmpty(propWhitelist)) {
        return;
      }

      if (matchesStringOrRegExp(value, propWhitelist)) {
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
