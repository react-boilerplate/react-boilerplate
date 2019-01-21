"use strict";

const isStandardSyntaxRule = require("../utils/isStandardSyntaxRule");
const report = require("../utils/report");
const styleSearch = require("style-search");

module.exports = function(opts) {
  opts.root.walkRules(rule => {
    if (!isStandardSyntaxRule(rule)) {
      return;
    }
    const selector = rule.selector;
    styleSearch(
      {
        source: selector,
        target: ",",
        functionArguments: "skip"
      },
      match => {
        checkDelimiter(selector, match.startIndex, rule);
      }
    );
  });

  function checkDelimiter(source, index, node) {
    opts.locationChecker({
      source,
      index,
      err: m =>
        report({
          message: m,
          node,
          index,
          result: opts.result,
          ruleName: opts.checkedRuleName
        })
    });
  }
};
