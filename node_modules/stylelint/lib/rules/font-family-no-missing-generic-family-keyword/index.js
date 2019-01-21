"use strict";

const declarationValueIndex = require("../../utils/declarationValueIndex");
const findFontFamily = require("../../utils/findFontFamily");
const keywordSets = require("../../reference/keywordSets");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "font-family-no-missing-generic-family-keyword";

const messages = ruleMessages(ruleName, {
  rejected: "Unexpected missing generic font family"
});

const isFamilyNameKeyword = node =>
  !node.quote && keywordSets.fontFamilyKeywords.has(node.value.toLowerCase());

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });
    if (!validOptions) {
      return;
    }

    root.walkDecls(/^font(-family)?$/i, decl => {
      // Ignore @font-face
      if (
        decl.parent &&
        decl.parent.type === "atrule" &&
        decl.parent.name.toLowerCase() === "font-face"
      ) {
        return;
      }

      const fontFamilies = findFontFamily(decl.value);

      if (fontFamilies.length === 0) {
        return;
      }

      if (fontFamilies.some(isFamilyNameKeyword)) {
        return;
      }

      report({
        result,
        ruleName,
        message: messages.rejected,
        node: decl,
        index:
          declarationValueIndex(decl) +
          fontFamilies[fontFamilies.length - 1].sourceIndex
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
