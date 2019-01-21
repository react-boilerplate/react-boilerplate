"use strict";

const isStandardSyntaxRule = require("../utils/isStandardSyntaxRule");
const parseSelector = require("../utils/parseSelector");
const report = require("../utils/report");
const styleSearch = require("style-search");

module.exports = function(options) {
  options.root.walkRules(rule => {
    if (!isStandardSyntaxRule(rule)) {
      return;
    }
    if (
      rule.selector.indexOf("[") === -1 ||
      rule.selector.indexOf("=") === -1
    ) {
      return;
    }

    parseSelector(rule.selector, options.result, rule, selectorTree => {
      selectorTree.walkAttributes(attributeNode => {
        const operator = attributeNode.operator;

        if (!operator) {
          return;
        }

        const attributeNodeString = attributeNode.toString();

        styleSearch(
          { source: attributeNodeString, target: operator },
          match => {
            const index = options.checkBeforeOperator
              ? match.startIndex
              : match.endIndex - 1;
            checkOperator(
              attributeNodeString,
              index,
              rule,
              attributeNode.sourceIndex,
              operator
            );
          }
        );
      });
    });

    function checkOperator(source, index, node, attributeIndex, operator) {
      options.locationChecker({
        source,
        index,
        err: m =>
          report({
            message: m.replace(
              options.checkBeforeOperator
                ? operator[0]
                : operator[operator.length - 1],
              operator
            ),
            node,
            index: attributeIndex + index,
            result: options.result,
            ruleName: options.checkedRuleName
          })
      });
    }
  });
};
