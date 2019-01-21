"use strict";

const _ = require("lodash");
const isKeyframeSelector = require("../../utils/isKeyframeSelector");
const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const isStandardSyntaxSelector = require("../../utils/isStandardSyntaxSelector");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const resolveNestedSelector = require("postcss-resolve-nested-selector");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-class-pattern";

const messages = ruleMessages(ruleName, {
  expected: selectorValue =>
    `Expected class selector ".${selectorValue}" to match specified pattern`
});

const rule = function(pattern, options) {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: pattern,
        possible: [_.isRegExp, _.isString]
      },
      {
        actual: options,
        possible: {
          resolveNestedSelectors: _.isBoolean
        },
        optional: true
      }
    );
    if (!validOptions) {
      return;
    }

    const shouldResolveNestedSelectors = _.get(
      options,
      "resolveNestedSelectors"
    );
    const normalizedPattern = _.isString(pattern)
      ? new RegExp(pattern)
      : pattern;

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

      // Only bother resolving selectors that have an interpolating &
      if (shouldResolveNestedSelectors && hasInterpolatingAmpersand(selector)) {
        resolveNestedSelector(selector, rule).forEach(selector => {
          if (!isStandardSyntaxSelector(selector)) {
            return;
          }

          parseSelector(selector, result, rule, s => checkSelector(s, rule));
        });
      } else {
        parseSelector(selector, result, rule, s => checkSelector(s, rule));
      }
    });

    function checkSelector(fullSelector, rule) {
      fullSelector.walkClasses(classNode => {
        const value = classNode.value;
        const sourceIndex = classNode.sourceIndex;

        if (normalizedPattern.test(value)) {
          return;
        }
        report({
          result,
          ruleName,
          message: messages.expected(value),
          node: rule,
          index: sourceIndex
        });
      });
    }
  };
};

// An "interpolating ampersand" means an "&" used to interpolate
// within another simple selector, rather than an "&" that
// stands on its own as a simple selector
function hasInterpolatingAmpersand(selector) {
  for (let i = 0, l = selector.length; i < l; i++) {
    if (selector[i] !== "&") {
      continue;
    }
    if (!_.isUndefined(selector[i - 1]) && !isCombinator(selector[i - 1])) {
      return true;
    }
    if (!_.isUndefined(selector[i + 1]) && !isCombinator(selector[i + 1])) {
      return true;
    }
  }
  return false;
}

function isCombinator(x) {
  return /[\s+>~]/.test(x);
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
