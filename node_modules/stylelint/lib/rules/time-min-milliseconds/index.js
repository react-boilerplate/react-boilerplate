"use strict";

const _ = require("lodash");
const declarationValueIndex = require("../../utils/declarationValueIndex");
const keywordSets = require("../../reference/keywordSets");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");
const valueParser = require("postcss-value-parser");

const ruleName = "time-min-milliseconds";

const messages = ruleMessages(ruleName, {
  expected: time => `Expected a minimum of ${time} milliseconds`
});

const rule = function(minimum) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: minimum,
      possible: _.isNumber
    });
    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const propertyName = postcss.vendor.unprefixed(decl.prop.toLowerCase());

      if (
        keywordSets.longhandTimeProperties.has(propertyName) &&
        !isAcceptableTime(decl.value)
      ) {
        complain(decl);
      }

      if (keywordSets.shorthandTimeProperties.has(propertyName)) {
        const valueList = postcss.list.space(decl.value);

        for (const value of valueList) {
          if (!isAcceptableTime(value)) {
            complain(decl, decl.value.indexOf(value));
          }
        }
      }
    });

    function isAcceptableTime(time) {
      const parsedTime = valueParser.unit(time);

      if (!parsedTime) return true;

      if (parsedTime.number <= 0) {
        return true;
      }

      if (
        parsedTime.unit.toLowerCase() === "ms" &&
        parsedTime.number < minimum
      ) {
        return false;
      }

      if (
        parsedTime.unit.toLowerCase() === "s" &&
        parsedTime.number * 1000 < minimum
      ) {
        return false;
      }

      return true;
    }

    function complain(decl, offset) {
      offset = offset || 0;

      report({
        result,
        ruleName,
        message: messages.expected(minimum),
        index: declarationValueIndex(decl) + offset,
        node: decl
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
