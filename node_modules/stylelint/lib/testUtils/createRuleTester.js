"use strict";

const _ = require("lodash");
const assignDisabledRanges = require("../assignDisabledRanges");
const basicChecks = require("./basicChecks");
const lessSyntax = require("postcss-less");
const normalizeRuleSettings = require("../normalizeRuleSettings");
const postcss = require("postcss");
const sassSyntax = require("postcss-sass");
const scssSyntax = require("postcss-scss");
const sugarss = require("sugarss");

/**
 * Create a stylelint rule testing function.
 *
 * Pass in an `equalityCheck` function. Given some information,
 * this checker should use Whatever Test Runner to perform
 * equality checks.
 *
 * `equalityCheck` should accept two arguments:
 * - `processCss` {Promise}: A Promise that resolves with an array of
 *   comparisons that you need to check (documented below).
 * - `context` {object}: An object that contains additional information
 *   you may need:
 *   - `caseDescription` {string}: A description of the test case as a whole.
 *   	 Will look like this:
 *   	   > rule: value-list-comma-space-before
 *   	   > config: "always-single-line"
 *   	   > code: "a { background-size: 0 ,0;\n}"
 *   - `comparisonCount` {number}: The number of comparisons that
 *     will need to be performed (e.g. useful for tape).
 *   - `completeAssertionDescription` {string}: While each individual
 *   	 comparison may have its own description, this is a description
 *   	 of the whole assertion (e.g. useful for Mocha).
 *   - `only` {boolean}: If `true`, the test runner should only run this
 *     test case (e.g. `test.only` in tape, `describe.only` in Mocha).
 *
 * `processCss` is a Promsie that resolves with an array of comparisons.
 * Each comparison has the following properties:
 * - `actual` {any}: Some actual value.
 * - `expected` {any}: Some expected value.
 * - `description` {string}: A (possibly empty) description of the comparison.
 *
 * Within `equalityCheck`, you need to ensure that you:
 * - Set up the test case.
 * - When `processCss` resolves, loop through every comparison.
 * - For each comparison, make an assertion checking that `actual === expected`.
 *
 * The `testRule` function that you get has a simple signature:
 * `testRule(rule, testGroupDescription)`.
 *
 * `rule` is just the rule that you are testing (a function).
 *
 * `testGroupDescription` is an object fitting the following schema.
 *
 * Required properties:
 * - `ruleName` {string}: The name of the rule. Used in descriptions.
 * - `config` {any}: The rule's configuration for this test group.
 *   Should match the format you'd use in `.stylelintrc`.
 * - `accept` {array}: An array of objects describing test cases that
 *   should not violate the rule. Each object has these properties:
 *   - `code` {string}: The source CSS to check.
 *   - `description` {[string]}: An optional description of the case.
 * - `reject` {array}: An array of objects describing test cases that
 *   should violate the rule once. Each object has these properties:
 *   - `code` {string}: The source CSS to check.
 *   - `message` {string}: The message of the expected violation.
 *   - `line` {[number]}: The expected line number of the violation.
 *     If this is left out, the line won't be checked.
 *   - `column` {[number]}: The expected column number of the violation.
 *     If this is left out, the column won't be checked.
 *   - `description` {[string]}: An optional description of the case.
 *
 * Optional properties:
 * - `syntax` {"css"|"scss"|"less"|"sugarss"}: Defaults to `"css"`.
 * - `skipBasicChecks` {boolean}: Defaults to `false`. If `true`, a
 *   few rudimentary checks (that should almost always be included)
 *   will not be performed.
 * - `preceedingPlugins` {array}: An array of PostCSS plugins that
 *   should be run before the CSS is tested.
 *
 * @param {function} equalityCheck - Described above
 * @return {function} testRule - Decsribed above
 */
let onlyTest;

function checkCaseForOnly(caseType, testCase) {
  if (!testCase.only) {
    return;
  }
  /* istanbul ignore next */
  if (onlyTest) {
    throw new Error("Cannot use `only` on multiple test cases");
  }
  onlyTest = { case: testCase, type: caseType };
}

module.exports = function(equalityCheck) {
  return function(rule, schema) {
    const alreadyHadOnlyTest = !!onlyTest;
    if (schema.accept) {
      schema.accept.forEach(_.partial(checkCaseForOnly, "accept"));
    }

    if (schema.reject) {
      schema.reject.forEach(_.partial(checkCaseForOnly, "reject"));
    }

    if (onlyTest) {
      schema = _.assign(_.omit(schema, ["accept", "reject"]), {
        skipBasicChecks: true,
        [onlyTest.type]: [onlyTest.case]
      });
    }

    if (!alreadyHadOnlyTest) {
      process.nextTick(() => {
        processGroup(rule, schema, equalityCheck);
      });
    }
  };
};

function processGroup(rule, schema, equalityCheck) {
  const ruleName = schema.ruleName;

  const ruleOptions = normalizeRuleSettings(schema.config, ruleName);
  const rulePrimaryOptions = ruleOptions[0];
  const ruleSecondaryOptions = ruleOptions[1];

  let printableConfig = rulePrimaryOptions
    ? JSON.stringify(rulePrimaryOptions)
    : "";
  if (printableConfig && ruleSecondaryOptions) {
    printableConfig += ", " + JSON.stringify(ruleSecondaryOptions);
  }

  function createCaseDescription(code) {
    let text = `\n> rule: ${ruleName}\n`;
    text += `> config: ${printableConfig}\n`;
    text += `> code: ${JSON.stringify(code)}\n`;
    return text;
  }

  // Process the code through the rule and return
  // the PostCSS LazyResult promise
  function postcssProcess(code) {
    const postcssProcessOptions = {};

    switch (schema.syntax) {
      case "sass":
        postcssProcessOptions.syntax = sassSyntax;
        break;
      case "scss":
        postcssProcessOptions.syntax = scssSyntax;
        break;
      case "less":
        postcssProcessOptions.syntax = lessSyntax;
        break;
      case "sugarss":
        postcssProcessOptions.syntax = sugarss;
        break;
    }

    const processor = postcss();
    processor.use(assignDisabledRanges);

    if (schema.preceedingPlugins) {
      schema.preceedingPlugins.forEach(plugin => processor.use(plugin));
    }

    return processor
      .use(rule(rulePrimaryOptions, ruleSecondaryOptions))
      .process(code, { postcssProcessOptions, from: undefined });
  }

  // Apply the basic positive checks unless
  // explicitly told not to
  const passingTestCases = schema.skipBasicChecks
    ? schema.accept
    : basicChecks.concat(schema.accept);

  if (passingTestCases && passingTestCases.length) {
    passingTestCases.forEach(acceptedCase => {
      if (!acceptedCase) {
        return;
      }
      const assertionDescription = spaceJoin(
        acceptedCase.description,
        "should be accepted"
      );
      const resultPromise = postcssProcess(acceptedCase.code)
        .then(postcssResult => {
          const warnings = postcssResult.warnings();
          return [
            {
              expected: 0,
              actual: warnings.length,
              description: assertionDescription
            }
          ];
        })
        .catch(err => console.log(err.stack)); // eslint-disable-line no-console

      equalityCheck(resultPromise, {
        comparisonCount: 1,
        caseDescription: createCaseDescription(acceptedCase.code),
        completeAssertionDescription: assertionDescription
      });
    });
  }

  if (schema.reject && schema.reject.length) {
    schema.reject.forEach(rejectedCase => {
      let completeAssertionDescription = "should register one warning";
      let comparisonCount = 1;
      if (rejectedCase.line) {
        comparisonCount++;
        completeAssertionDescription += ` on line ${rejectedCase.line}`;
      }
      if (rejectedCase.column !== undefined) {
        comparisonCount++;
        completeAssertionDescription += ` on column ${rejectedCase.column}`;
      }
      if (rejectedCase.message) {
        comparisonCount++;
        completeAssertionDescription += ` with message "${
          rejectedCase.message
        }"`;
      }

      const resultPromise = postcssProcess(rejectedCase.code)
        .then(postcssResult => {
          const warnings = postcssResult.warnings();
          const warning = warnings[0];

          const comparisons = [
            {
              expected: 1,
              actual: warnings.length,
              description: spaceJoin(
                rejectedCase.description,
                "should register one warning"
              )
            }
          ];

          if (rejectedCase.line) {
            comparisons.push({
              expected: rejectedCase.line,
              actual: _.get(warning, "line"),
              description: spaceJoin(
                rejectedCase.description,
                `should warn on line ${rejectedCase.line}`
              )
            });
          }
          if (rejectedCase.column !== undefined) {
            comparisons.push({
              expected: rejectedCase.column,
              actual: _.get(warning, "column"),
              description: spaceJoin(
                rejectedCase.description,
                `should warn on column ${rejectedCase.column}`
              )
            });
          }
          if (rejectedCase.message) {
            comparisons.push({
              expected: rejectedCase.message,
              actual: _.get(warning, "text"),
              description: spaceJoin(
                rejectedCase.description,
                `should warn with message ${rejectedCase.message}`
              )
            });
          }
          return comparisons;
        })
        .catch(err => console.log(err.stack)); // eslint-disable-line no-console

      equalityCheck(resultPromise, {
        comparisonCount,
        completeAssertionDescription,
        caseDescription: createCaseDescription(rejectedCase.code),
        only: rejectedCase.only
      });
    });
  }
}

function spaceJoin() {
  return _.compact(Array.from(arguments)).join(" ");
}
