"use strict";

const eachDeclarationBlock = require("../../utils/eachDeclarationBlock");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const shorthandData = require("../../reference/shorthandData");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "declaration-block-no-shorthand-property-overrides";

const messages = ruleMessages(ruleName, {
  rejected: (shorthand, original) =>
    `Unexpected shorthand "${shorthand}" after "${original}"`
});

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    eachDeclarationBlock(root, eachDecl => {
      const declarations = {};

      eachDecl(decl => {
        const prop = decl.prop;
        const unprefixedProp = postcss.vendor.unprefixed(prop);
        const prefix = postcss.vendor.prefix(prop).toLowerCase();

        const overrideables = shorthandData[unprefixedProp.toLowerCase()];
        if (!overrideables) {
          declarations[prop.toLowerCase()] = prop;
          return;
        }
        overrideables.forEach(longhandProp => {
          if (!declarations.hasOwnProperty(prefix + longhandProp)) {
            return;
          }
          report({
            ruleName,
            result,
            node: decl,
            message: messages.rejected(
              prop,
              declarations[prefix + longhandProp]
            )
          });
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
