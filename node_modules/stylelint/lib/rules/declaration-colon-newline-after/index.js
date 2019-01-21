"use strict";

const declarationValueIndex = require("../../utils/declarationValueIndex");
const isStandardSyntaxDeclaration = require("../../utils/isStandardSyntaxDeclaration");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "declaration-colon-newline-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected newline after ":"',
  expectedAfterMultiLine: () =>
    'Expected newline after ":" with a multi-line declaration'
});

const rule = function(expectation) {
  const checker = whitespaceChecker("newline", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "always-multi-line"]
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      if (!isStandardSyntaxDeclaration(decl)) {
        return;
      }

      // Get the raw prop, and only the prop
      const endOfPropIndex =
        declarationValueIndex(decl) + (decl.raws.between || "").length - 1;

      // The extra characters tacked onto the end ensure that there is a character to check
      // after the colon. Otherwise, with `background:pink` the character after the
      const propPlusColon = decl.toString().slice(0, endOfPropIndex) + "xxx";

      for (let i = 0, l = propPlusColon.length; i < l; i++) {
        if (propPlusColon[i] !== ":") {
          continue;
        }
        const indexToCheck =
          propPlusColon.substr(propPlusColon[i], 3) === "/*"
            ? propPlusColon.indexOf("*/", i) + 1
            : i;

        checker.afterOneOnly({
          source: propPlusColon,
          index: indexToCheck,
          lineCheckStr: decl.value,
          err: m => {
            report({
              message: m,
              node: decl,
              index: indexToCheck,
              result,
              ruleName
            });
          }
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
