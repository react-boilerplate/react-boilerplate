"use strict";

const declarationBangSpaceChecker = require("../declarationBangSpaceChecker");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "declaration-bang-space-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: () => 'Expected single space before "!"',
  rejectedBefore: () => 'Unexpected whitespace before "!"'
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
      locationChecker: checker.before,
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

            const targetBefore = target.slice(0, bangIndex);
            const targetAfter = target.slice(bangIndex);

            if (expectation === "always") {
              setFixed(targetBefore.replace(/\s*$/, "") + " " + targetAfter);
              return true;
            } else if (expectation === "never") {
              setFixed(targetBefore.replace(/\s*$/, "") + targetAfter);
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
