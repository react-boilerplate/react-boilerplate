"use strict";

const _ = require("lodash");
const declarationValueIndex = require("../utils/declarationValueIndex");
const isStandardSyntaxFunction = require("../utils/isStandardSyntaxFunction");
const report = require("../utils/report");
const styleSearch = require("style-search");
const valueParser = require("postcss-value-parser");

module.exports = function(opts) {
  opts.root.walkDecls(decl => {
    const declValue = _.get(decl, "raws.value.raw", decl.value);

    valueParser(declValue).walk(valueNode => {
      if (valueNode.type !== "function") {
        return;
      }

      if (!isStandardSyntaxFunction(valueNode)) {
        return;
      }

      // Ignore `url()` arguments, which may contain data URIs or other funky stuff
      if (valueNode.value.toLowerCase() === "url") {
        return;
      }

      const functionArguments = (() => {
        let result = valueParser.stringify(valueNode);
        // Remove function name and opening paren
        result = result.slice(valueNode.value.length + 1);
        // Remove closing paren
        result = result.slice(0, result.length - 1);
        // 1. Remove comments including preceeding whitespace (when only succeeded by whitespace)
        // 2. Remove all other comments, but leave adjacent whitespace intact
        result = result.replace(
          /( *\/(\*.*\*\/(?!\S)|\/.*)|(\/(\*.*\*\/|\/.*)))/,
          ""
        );
        return result;
      })();

      styleSearch(
        {
          source: functionArguments,
          target: ",",
          functionArguments: "skip"
        },
        match => {
          opts.locationChecker({
            source: functionArguments,
            index: match.startIndex,
            err: message => {
              const index =
                declarationValueIndex(decl) +
                valueNode.value.length +
                1 +
                valueNode.sourceIndex +
                match.startIndex;
              report({
                index,
                message,
                node: decl,
                result: opts.result,
                ruleName: opts.checkedRuleName
              });
            }
          });
        }
      );
    });
  });
};
