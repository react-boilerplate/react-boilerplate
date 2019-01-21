# Rule testers

stylelint rules require *a lot* of tests. So we've built a specialized stylelint rule testing format to speed up the mass production of consistent, effective rule tests.

There is a schema for describing tests, and a function for creating "rule testers" that interpret that schema using a test framework (e.g. tape or Mocha).

When developing plugins, you can use the following rule testers or create your own.

-   stylelint-test-rule-tape
-   stylelint-test-rule-mocha
-   stylelint-test-rule-ava

## Using a rule tester

To use the rule tester of your choice, do the following:

```js
// `testRule` = the imported rule tester
testRule(rule, testGroupDescription)
```

`rule` is just the rule that you are testing (a function).

`testGroupDescription` is an object fitting the following schema.

### The test group schema

Each test group object describes a set of test-cases for a certain rule with a certain configuration.

Required properties:

-   `ruleName` {string}: The name of the rule. Used in generated test-case descriptions.
-   `config` {any}: The rule's configuration for this test group. Should match the rule configuration format you'd use in `.stylelintrc`.
-   `accept` {array}: An array of objects describing test cases that *should not violate the rule*. Each object has these properties:
    -   `code` {string}: The source CSS to check.
    -   `description` {string}: *Optional.* A description of the case.
    -   `only` {boolean}: If `true`, run only this test case.
-   `reject` {array}: An array of objects describing test cases that *should violate the rule once*. Each object has these properties:
    -   `code` {string}: The source CSS to check.
    -   `message` {string}: The message of the expected violation.
    -   `line` {number}: *Optional but recommended.* The expected line number of the violation. If this is left out, the line won't be checked.
    -   `column` {number}: *Optional but recommended.* The expected column number of the violation. If this is left out, the column won't be checked.
    -   `description` {string}: *Optional.* A description of the case.
    -   `only` {boolean}: If `true`, run only this test case.
    -   `fixed` {string}: *Required if test schema has `fix` enabled.* Result of autofixing against `code` property.

Optional properties:

-   `syntax` {"css"|"less"|"scss"|"sugarss"}: Defaults to `"css"`. Other settings use special parsers.
-   `skipBasicChecks` {boolean}: Defaults to `false`. If `true`, a few rudimentary checks (that should almost always be included) will not be performed. You can check those out in `lib/testUtils/basicChecks.js`.
-   `preceedingPlugins` {array}: An array of PostCSS plugins that should be run before the CSS is tested.
-   `fix` {boolean}: Defaults to `false`. If `true`, every `reject` test-case will be tested for autofixing functionality. *Required if rule has autofixing.*

## Creating a rule tester

stylelint itself exposes a means of creating rule testers with just about any testing framework.

```js
var testRule = stylelint.createRuleTester(equalityCheck)
```

Pass in an `equalityCheck` function. Given some information, this checker should use whatever test runner you like to perform equality checks.

The `equalityCheck` function should accept two arguments:

-   `processCss` {Promise}: A Promise that resolves with an array of comparisons that you need to check (documented below).
-   `context` {object}: An object that contains additional information you may need:
    -   `caseDescription` {string}: A description of the test case as  whole. It will end up printing like something this:
    ```bash
    > rule: value-list-comma-space-before
    > config: "always-single-line"
    > code: "a { background-size: 0 ,0;\n}"
    ```
    -   `comparisonCount` {number}: The number of comparisons that will need to be performed (e.g. useful for tape).
    -   `completeAssertionDescription` {string}: While each individual comparison may have its own description, this is a description of the whole assertion (e.g. useful for Mocha).
    -   `only` {boolean}: If `true`, the test runner should only run this test case (e.g. `test.only` in tape, `describe.only` in Mocha).

`processCss` is a Promise that resolves with an array of comparisons. Each comparison has the following properties:

-   `actual` {any}: Some actual value.
-   `expected` {any}: Some expected value.
-   `description` {string}: A (possibly empty) description of the comparison.

Within the `equalityCheck` function, you need to ensure that you do the following:

-   Set up the test case.
-   When `processCss` resolves, loop through every comparison.
-   For each comparison, make an assertion checking that `actual === expected`.

A `testRule` function (as described above) is returned.
