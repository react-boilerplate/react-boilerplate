"use strict";

const _ = require("lodash");
const postcss = require("postcss");
const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "linebreaks";

const messages = ruleMessages(ruleName, {
  expected: linebreak => `Expected linebreak to be ${linebreak}`
});

const rule = function(actual, secondary, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual,
      possible: ["unix", "windows"]
    });

    if (!validOptions) {
      return;
    }

    const shouldHaveCR = actual === "windows";

    if (context.fix) {
      const propertiesToUpdate = [
        "selector",
        "raws.before",
        "raws.after",
        "value",
        "text"
      ];

      root.walk(node => {
        propertiesToUpdate.forEach(property => {
          const fixedData = fixData(_.get(node, property), shouldHaveCR);
          _.set(node, property, fixedData);
        });
      });

      root.raws.after = fixData(root.raws.after, shouldHaveCR);
    } else {
      const lines = root.source.input.css.split("\n");

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (i < lines.length - 1 && line.indexOf("\r") === -1) {
          line += "\n";
        }

        if (hasError(line, shouldHaveCR)) {
          const lineNum = i + 1;
          const colNum = line.length;
          reportNewlineError(shouldHaveCR, lineNum, colNum, actual, result);
        }
      }
    }

    function hasError(dataToCheck, shouldHaveCR) {
      const hasNewlineToVerify = /[\r\n]/.test(dataToCheck);
      const hasCR = hasNewlineToVerify ? /\r/.test(dataToCheck) : false;

      return hasNewlineToVerify && hasCR !== shouldHaveCR;
    }

    function fixData(data, shouldHaveCR) {
      if (data) {
        let result = data.replace(/\r/g, "");
        if (shouldHaveCR) {
          result = result.replace(/\n/g, "\r\n");
        }

        return result;
      }
      return data;
    }

    function createReportNode(line, column) {
      // Creating a node manually helps us to point to empty lines.
      return postcss.rule({
        source: {
          start: {
            line,
            column
          }
        }
      });
    }

    function reportNewlineError(shouldHaveCR, lineNum, colNum, actual, result) {
      const reportNode = createReportNode(lineNum, colNum);

      report({
        message: messages.expected(actual),
        node: reportNode,
        result,
        ruleName
      });
    }
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
