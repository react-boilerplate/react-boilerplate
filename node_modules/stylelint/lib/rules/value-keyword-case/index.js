"use strict";

const _ = require("lodash");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const getUnitFromValueNode = require("../../utils/getUnitFromValueNode");
const isCounterIncrementCustomIdentValue = require("../../utils/isCounterIncrementCustomIdentValue");
const isCounterResetCustomIdentValue = require("../../utils/isCounterResetCustomIdentValue");
const isStandardSyntaxValue = require("../../utils/isStandardSyntaxValue");
const keywordSets = require("../../reference/keywordSets");
const matchesStringOrRegExp = require("../../utils/matchesStringOrRegExp");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueParser = require("postcss-value-parser");

const ruleName = "value-keyword-case";

const messages = ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

// Operators are interpreted as "words" by the value parser, so we want to make sure to ignore them.
const ignoredCharacters = new Set(["+", "-", "/", "*", "%"]);

const mapLowercaseKeywordsToCamelCase = new Map();
keywordSets.camelCaseKeywords.forEach(func => {
  mapLowercaseKeywordsToCamelCase.set(func.toLowerCase(), func);
});

const rule = function(expectation, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: expectation,
        possible: ["lower", "upper"]
      },
      {
        actual: options,
        possible: {
          ignoreProperties: [_.isString],
          ignoreKeywords: [_.isString]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const prop = decl.prop;
      const value = decl.value;

      valueParser(value).walk(node => {
        const valueLowerCase = node.value.toLowerCase();

        // Ignore system colors
        if (keywordSets.systemColors.has(valueLowerCase)) {
          return;
        }

        // Ignore keywords within `url` and `var` function
        if (
          node.type === "function" &&
          (valueLowerCase === "url" ||
            valueLowerCase === "var" ||
            valueLowerCase === "counter" ||
            valueLowerCase === "counters" ||
            valueLowerCase === "attr")
        ) {
          return false;
        }

        const keyword = node.value;

        // Ignore css variables, and hex values, and math operators, and sass interpolation
        if (
          node.type !== "word" ||
          !isStandardSyntaxValue(node.value) ||
          value.indexOf("#") !== -1 ||
          ignoredCharacters.has(keyword) ||
          getUnitFromValueNode(node)
        ) {
          return;
        }

        if (
          prop === "animation" &&
          !keywordSets.animationShorthandKeywords.has(valueLowerCase) &&
          !keywordSets.animationNameKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "animation-name" &&
          !keywordSets.animationNameKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "font" &&
          !keywordSets.fontShorthandKeywords.has(valueLowerCase) &&
          !keywordSets.fontFamilyKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "font-family" &&
          !keywordSets.fontFamilyKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "counter-increment" &&
          isCounterIncrementCustomIdentValue(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "counter-reset" &&
          isCounterResetCustomIdentValue(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "grid-row" &&
          !keywordSets.gridRowKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "grid-column" &&
          !keywordSets.gridColumnKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "grid-area" &&
          !keywordSets.gridAreaKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "list-style" &&
          !keywordSets.listStyleShorthandKeywords.has(valueLowerCase) &&
          !keywordSets.listStyleTypeKeywords.has(valueLowerCase)
        ) {
          return;
        }
        if (
          prop === "list-style-type" &&
          !keywordSets.listStyleTypeKeywords.has(valueLowerCase)
        ) {
          return;
        }

        const ignoreKeywords = (options && options.ignoreKeywords) || [];
        const ignoreProperties = (options && options.ignoreProperties) || [];

        if (
          ignoreKeywords.length > 0 &&
          matchesStringOrRegExp(keyword, ignoreKeywords)
        ) {
          return;
        }

        if (
          ignoreProperties.length > 0 &&
          matchesStringOrRegExp(prop, ignoreProperties)
        ) {
          return;
        }

        const keywordLowerCase = keyword.toLocaleLowerCase();
        let expectedKeyword = null;

        if (
          expectation === "lower" &&
          mapLowercaseKeywordsToCamelCase.has(keywordLowerCase)
        ) {
          expectedKeyword = mapLowercaseKeywordsToCamelCase.get(
            keywordLowerCase
          );
        } else if (expectation === "lower") {
          expectedKeyword = keyword.toLowerCase();
        } else {
          expectedKeyword = keyword.toUpperCase();
        }

        if (keyword === expectedKeyword) {
          return;
        }

        report({
          message: messages.expected(keyword, expectedKeyword),
          node: decl,
          index: declarationValueIndex(decl) + node.sourceIndex,
          result,
          ruleName
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
