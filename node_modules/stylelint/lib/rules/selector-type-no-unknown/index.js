"use strict";

const _ = require("lodash");
const htmlTags = require("html-tags");
const isCustomElement = require("../../utils/isCustomElement");
const isKeyframeSelector = require("../../utils/isKeyframeSelector");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const isStandardSyntaxTypeSelector = require("../../utils/isStandardSyntaxTypeSelector");
const keywordSets = require("../../reference/keywordSets");
const mathMLTags = require("mathml-tag-names");
const optionsMatches = require("../../utils/optionsMatches");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const svgTags = require("svg-tags");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-type-no-unknown";

const messages = ruleMessages(ruleName, {
  rejected: selector => `Unexpected unknown type selector "${selector}"`
});

const rule = function(actual, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      { actual },
      {
        actual: options,
        possible: {
          ignore: ["custom-elements", "default-namespace"],
          ignoreNamespaces: [_.isString],
          ignoreTypes: [_.isString]
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      const selector = rule.selector;
      const selectors = rule.selectors;

      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      if (!isStandardSyntaxSelector(selector)) {
        return;
      }
      if (selectors.some(s => isKeyframeSelector(s))) {
        return;
      }

      parseSelector(selector, result, rule, selectorTree => {
        selectorTree.walkTags(tagNode => {
          if (!isStandardSyntaxTypeSelector(tagNode)) {
            return;
          }

          if (
            optionsMatches(options, "ignore", "custom-elements") &&
            isCustomElement(tagNode.value)
          ) {
            return;
          }

          if (
            optionsMatches(options, "ignore", "default-namespace") &&
            !(typeof tagNode.namespace === "string")
          ) {
            return;
          }

          if (optionsMatches(options, "ignoreNamespaces", tagNode.namespace)) {
            return;
          }

          if (optionsMatches(options, "ignoreTypes", tagNode.value)) {
            return;
          }

          const tagName = tagNode.value;
          const tagNameLowerCase = tagName.toLowerCase();

          if (
            htmlTags.indexOf(tagNameLowerCase) !== -1 ||
            svgTags.indexOf(tagNameLowerCase) !== -1 ||
            keywordSets.nonStandardHtmlTags.has(tagNameLowerCase) ||
            mathMLTags.indexOf(tagNameLowerCase) !== -1
          ) {
            return;
          }

          report({
            message: messages.rejected(tagName),
            node: rule,
            index: tagNode.sourceIndex,
            ruleName,
            result
          });
        });
      });
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
