"use strict";

const atRuleParamIndex = require("../utils/atRuleParamIndex");
const report = require("../utils/report");
const styleSearch = require("style-search");

module.exports = function(opts) {
  opts.root.walkAtRules(/^media$/i, atRule => {
    const params = atRule.params;

    styleSearch({ source: params, target: ":" }, match => {
      checkColon(params, match.startIndex, atRule);
    });
  });

  function checkColon(source, index, node) {
    opts.locationChecker({
      source,
      index,
      err: m =>
        report({
          message: m,
          node,
          index: index + atRuleParamIndex(node),
          result: opts.result,
          ruleName: opts.checkedRuleName
        })
    });
  }
};
