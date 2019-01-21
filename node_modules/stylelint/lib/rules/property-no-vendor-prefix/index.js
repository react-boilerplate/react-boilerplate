"use strict";

const _ = require("lodash");
const isAutoprefixable = require("../../utils/isAutoprefixable");
const optionsMatches = require("../../utils/optionsMatches");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "property-no-vendor-prefix";

const messages = ruleMessages(ruleName, {
  rejected: property => `Unexpected vendor-prefix "${property}"`
});

const rule = function(actual, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      { actual },
      {
        optional: true,
        actual: options,
        possible: {
          ignoreProperties: [_.isString]
        }
      }
    );

    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const prop = decl.prop;
      const unprefixedProp = postcss.vendor.unprefixed(prop);

      //return early if property is to be ignored
      if (optionsMatches(options, "ignoreProperties", unprefixedProp)) {
        return;
      }

      // Make sure there's a vendor prefix,
      // but this isn't a custom property

      if (prop[0] !== "-" || prop[1] === "-") {
        return;
      }

      if (!isAutoprefixable.property(prop)) {
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

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
