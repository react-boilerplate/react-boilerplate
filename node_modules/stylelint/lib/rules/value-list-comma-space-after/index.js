"use strict";

const declarationValueIndex = require("../../utils/declarationValueIndex");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueListCommaWhitespaceChecker = require("../valueListCommaWhitespaceChecker");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "value-list-comma-space-after";

const messages = ruleMessages(ruleName, {
  expectedAfter: () => 'Expected single space after ","',
  rejectedAfter: () => 'Unexpected whitespace after ","',
  expectedAfterSingleLine: () =>
    'Expected single space after "," in a single-line list',
  rejectedAfterSingleLine: () =>
    'Unexpected whitespace after "," in a single-line list'
});

const rule = function(expectation, options, context) {
  const checker = whitespaceChecker("space", expectation, messages);
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never", "always-single-line", "never-single-line"]
    });
    if (!validOptions) {
      return;
    }

    let fixData;
    valueListCommaWhitespaceChecker({
      root,
      result,
      locationChecker: checker.after,
      checkedRuleName: ruleName,
      fix: context.fix
        ? (declNode, index) => {
            const valueIndex = declarationValueIndex(declNode);
            if (index <= valueIndex) {
              return false;
            }
            fixData = fixData || new Map();
            const commaIndices = fixData.get(declNode) || [];
            commaIndices.push(index);
            fixData.set(declNode, commaIndices);
            return true;
          }
        : null
    });
    if (fixData) {
      fixData.forEach((commaIndices, decl) => {
        commaIndices.sort((a, b) => b - a).forEach(index => {
          const value = decl.raws.value ? decl.raws.value.raw : decl.value;
          const valueIndex = index - declarationValueIndex(decl);
          const beforeValue = value.slice(0, valueIndex + 1);
          let afterValue = value.slice(valueIndex + 1);
          if (expectation.indexOf("always") === 0) {
            afterValue = afterValue.replace(/^\s*/, " ");
          } else if (expectation.indexOf("never") === 0) {
            afterValue = afterValue.replace(/^\s*/, "");
          }
          if (decl.raws.value) {
            decl.raws.value.raw = beforeValue + afterValue;
          } else {
            decl.value = beforeValue + afterValue;
          }
        });
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
