"use strict";

const _ = require("lodash");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const getUnitFromValueNode = require("../../utils/getUnitFromValueNode");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueParser = require("postcss-value-parser");

const ruleName = "declaration-property-unit-whitelist";

const messages = ruleMessages(ruleName, {
  rejected: (property, unit) =>
    `Unexpected unit "${unit}" for property "${property}"`
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

      if (!propWhitelist) {
        return;
      }

      valueParser(value).walk(function(node) {
        // Ignore wrong units within `url` function
        if (node.type === "function" && node.value.toLowerCase() === "url") {
          return false;
        }
        if (node.type === "string") {
          return;
        }

        const unit = getUnitFromValueNode(node);

        if (
          !unit ||
          (unit && propWhitelist.indexOf(unit.toLowerCase())) !== -1
        ) {
          return;
        }

        report({
          message: messages.rejected(prop, unit),
          node: decl,
          index: declarationValueIndex(decl) + node.sourceIndex,
          result,
          ruleName
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
