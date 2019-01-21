"use strict";

const isStandardSyntaxRule = require("../../utils/isStandardSyntaxRule");
const parseSelector = require("../../utils/parseSelector");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "selector-pseudo-class-parentheses-space-inside";

const messages = ruleMessages(ruleName, {
  expectedOpening: 'Expected single space after "("',
  rejectedOpening: 'Unexpected whitespace after "("',
  expectedClosing: 'Expected single space before ")"',
  rejectedClosing: 'Unexpected whitespace before ")"'
});

const rule = function(expectation, options, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) {
        return;
      }
      if (rule.selector.indexOf("(") === -1) {
        return;
      }

      let hasFixed = false;
      const selector = rule.raws.selector
        ? rule.raws.selector.raw
        : rule.selector;
      const fixedSelector = parseSelector(
        selector,
        result,
        rule,
        selectorTree => {
          selectorTree.walkPseudos(pseudoNode => {
            if (!pseudoNode.length) {
              return;
            }
            const beforeString =
              (pseudoNode.rawSpaceBefore || "") +
              stringifyProperty(pseudoNode, "value");
            const paramString = pseudoNode.map(String).join(",");
            const nextCharIsSpace = paramString.startsWith(" ");
            const openIndex = pseudoNode.sourceIndex + beforeString.length + 1;
            if (nextCharIsSpace && expectation === "never") {
              if (context.fix) {
                hasFixed = true;
                setFirstNodeSpaceBefore(pseudoNode, "");
              } else {
                complain(messages.rejectedOpening, openIndex);
              }
            }
            if (!nextCharIsSpace && expectation === "always") {
              if (context.fix) {
                hasFixed = true;
                setFirstNodeSpaceBefore(pseudoNode, " ");
              } else {
                complain(messages.expectedOpening, openIndex);
              }
            }

            const prevCharIsSpace = paramString.endsWith(" ");
            const closeIndex = openIndex + paramString.length - 1;
            if (prevCharIsSpace && expectation === "never") {
              if (context.fix) {
                hasFixed = true;
                setLastNodeSpaceAfter(pseudoNode, "");
              } else {
                complain(messages.rejectedClosing, closeIndex);
              }
            }
            if (!prevCharIsSpace && expectation === "always") {
              if (context.fix) {
                hasFixed = true;
                setLastNodeSpaceAfter(pseudoNode, " ");
              } else {
                complain(messages.expectedClosing, closeIndex);
              }
            }
          });
        }
      );

      if (hasFixed) {
        if (!rule.raws.selector) {
          rule.selector = fixedSelector;
        } else {
          rule.raws.selector.raw = fixedSelector;
        }
      }

      function complain(message, index) {
        report({
          message,
          index,
          result,
          ruleName,
          node: rule
        });
      }
    });
  };
};

function setFirstNodeSpaceBefore(node, value) {
  const target = node.first;
  if (target.type === "selector") {
    setFirstNodeSpaceBefore(target, value);
  } else {
    target.spaces.before = value;
  }
}
function setLastNodeSpaceAfter(node, value) {
  const target = node.last;
  if (target.type === "selector") {
    setLastNodeSpaceAfter(target, value);
  } else {
    target.spaces.after = value;
  }
}

function stringifyProperty(node, propName) {
  return (node.raws && node.raws[propName]) || node[propName];
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
