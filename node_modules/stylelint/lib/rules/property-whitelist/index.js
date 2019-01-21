"use strict";

const _ = require("lodash");
const isCustomProperty = require("../../utils/isCustomProperty");
const isStandardSyntaxProperty = require("../../utils/isStandardSyntaxProperty");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "property-whitelist";

const messages = ruleMessages(ruleName, {
  rejected: property => `Unexpected property "${property}"`
});

const rule = function(whitelist) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: whitelist,
      possible: [_.isString]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const prop = decl.prop;

      if (!isStandardSyntaxProperty(prop)) {
        return;
      }
      if (isCustomProperty(prop)) {
        return;
      }
      if (matchesStringOrRegExp(postcss.vendor.unprefixed(prop), whitelist)) {
        return;
      }

      report({
        message: messages.rejected(prop),
        node: decl,
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
