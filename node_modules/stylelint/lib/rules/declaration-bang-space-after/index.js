"use strict";

const declarationBangSpaceChecker = require("../declarationBangSpaceChecker");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "declaration-bang-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected single space after "!"',
  rejectedAfter: () => 'Unexpected whitespace after "!"'
});

const rule = function(expectation, options, context) {
  const checker = whitespaceChecker("space", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    declarationBangSpaceChecker({
      root,
      result,
      locationChecker: checker.after,
      checkedRuleName: ruleName,
      fix: context.fix
        ? (decl, index) => {
            let bangIndex = index - declarationValueIndex(decl);
            const value = decl.raws.value ? decl.raws.value.raw : decl.value;
            let target;
            let setFixed;
            if (bangIndex < value.length) {
              target = value;
              setFixed = value => {
                if (decl.raws.value) {
                  decl.raws.value.raw = value;
                } else {
                  decl.value = value;
                }
              };
            } else if (decl.important) {
              target = decl.raws.important || " !important";
              bangIndex -= value.length;
              setFixed = value => {
                decl.raws.important = value;
              };
            } else {
              return false; // not standard
            }

            const targetBefore = target.slice(0, bangIndex + 1);
            const targetAfter = target.slice(bangIndex + 1);

            if (expectation === "always") {
              setFixed(targetBefore + targetAfter.replace(/^\s*/, " "));
              return true;
            } else if (expectation === "never") {
              setFixed(targetBefore + targetAfter.replace(/^\s*/, ""));
              return true;
            }
          }
        : null
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
