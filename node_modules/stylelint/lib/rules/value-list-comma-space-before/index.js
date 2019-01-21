"use strict";

const declarationValueIndex = require("../../utils/declarationValueIndex");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueListCommaWhitespaceChecker = require("../valueListCommaWhitespaceChecker");
const whitespaceChecker = require("../../utils/whitespaceChecker");

const ruleName = "value-list-comma-space-before";

const messages = ruleMessages(ruleName, {
  expectedBefore: () => 'Expected single space before ","',
  rejectedBefore: () => 'Unexpected whitespace before ","',
  expectedBeforeSingleLine: () =>
    'Unexpected whitespace before "," in a single-line list',
  rejectedBeforeSingleLine: () =>
    'Unexpected whitespace before "," in a single-line list'
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
      locationChecker: checker.before,
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
          let beforeValue = value.slice(0, valueIndex);
          const afterValue = value.slice(valueIndex);
          if (expectation.indexOf("always") === 0) {
            beforeValue = beforeValue.replace(/\s*$/, " ");
          } else if (expectation.indexOf("never") === 0) {
            beforeValue = beforeValue.replace(/\s*$/, "");
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
