"use strict";

const _ = require("lodash");
const isAutoprefixable = require("../../utils/isAutoprefixable");
const isStandardSyntaxDeclaration = require("../../utils/isStandardSyntaxDeclaration");
const isStandardSyntaxProperty = require("../../utils/isStandardSyntaxProperty");
const optionsMatches = require("../../utils/optionsMatches");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "value-no-vendor-prefix";

const messages = ruleMessages(ruleName, {
  rejected: value => `Unexpected vendor-prefix "${value}"`
});

const valuePrefixes = ["-webkit-", "-moz-", "-ms-", "-o-"];

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
          ignoreValues: [_.isString]
        }
      }
    );

    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      if (
        !isStandardSyntaxDeclaration(decl) ||
        !isStandardSyntaxProperty(decl.prop) ||
        decl.value[0] !== "-"
      ) {
        return;
      }

      const prop = decl.prop;
      const value = decl.value;
      const unprefixedValue = postcss.vendor.unprefixed(value);

      //return early if value is to be ignored
      if (optionsMatches(options, "ignoreValues", unprefixedValue)) {
        return;
      }

      // Search the full declaration in order to get an accurate index

      styleSearch(
        { source: value.toLowerCase(), target: valuePrefixes },
        match => {
          const fullIdentifier = /^(-[a-z-]+)\b/i.exec(
            value.slice(match.startIndex)
          )[1];
          if (!isAutoprefixable.propertyValue(prop, fullIdentifier)) {
            return;
          }

          report({
            message: messages.rejected(fullIdentifier),
            node: decl,
            index:
              prop.length + (decl.raws.between || "").length + match.startIndex,
            result,
            ruleName
          });
        }
      );
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
