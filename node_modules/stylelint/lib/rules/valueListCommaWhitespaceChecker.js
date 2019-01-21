"use strict";

const isStandardSyntaxDeclaration = require("../utils/isStandardSyntaxDeclaration");
const isStandardSyntaxProperty = require("../utils/isStandardSyntaxProperty");
const report = require("../utils/report");
const styleSearch = require("style-search");

module.exports = function(opts) {
  opts.root.walkDecls(decl => {
    if (
      !isStandardSyntaxDeclaration(decl) ||
      !isStandardSyntaxProperty(decl.prop)
    ) {
      return;
    }
    styleSearch(
      {
        source: decl.toString(),
        target: ",",
        functionArguments: "skip"
      },
      match => {
        checkComma(decl.toString(), match.startIndex, decl);
      }
    );
  });

  function checkComma(source, index, node) {
    opts.locationChecker({
      source,
      index,
      err: m => {
        if (opts.fix && opts.fix(node, index)) {
          return;
        }
        report({
          message: m,
          node,
          index,
          result: opts.result,
          ruleName: opts.checkedRuleName
        });
      }
    });
  }
};
