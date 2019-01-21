# Working on rules

Please help us create, enhance, and debug stylelint rules!

<!-- TOC -->

## Creating a new rule

First, open [an issue](https://github.com/stylelint/stylelint/issues/new) with your idea for the new rule.

Usually we have some discussion about the rule's purpose, name, options, and suitability as a rule.

### Criteria for inclusion

We discuss whether the rule meets the following criteria for inclusion in stylelint:

-   Applicable to standard CSS syntax only.
-   Generally useful; not tied to idiosyncratic patterns.
-   Has a clear and unambiguous finished state.
-   Has a singular purpose.
-   Is standalone, and doesn't rely on another rule.
-   Does not contain functionality that overlaps with another rule.

Otherwise, it should be a plugin. However, plugins should also try to adhere to the latter three criteria.

### Naming a rule

Have a look at the [rules user guide](../user-guide/about-rules.md) to familiarize yourself the rule naming conventions.

We take care to ensure that all the rules are named accurately and consistently. Our goals in that effort are to ensure that rules are easy to find and understand, and to prevent us from wanting to change the name later.

*Rules are named to encourage explicit, rather than implicit, options.* For example, `color-hex-case: "upper"|"lower"` rather than `color-hex-uppercase: "always"|"never"`. As `color-hex-uppercase: "never"` *implies* always lowercase, whereas `color-hex-case: "lower"` makes it *explicit*.

### Determining options

#### Primary

Every rule *must have* a **primary option**.

-   In `"color-hex-case": "upper"`, the primary option is `"upper"`.
-   In `"indentation": [2, { "except": ["block"] }]`, the primary option is `2`.

If your rule can accept an array as its primary option, you must designate this by setting the property `primaryOptionArray = true` on your rule function. For example:

```js
function rule(primary, secondary) {
  return (root, result) => {..}
}
rule.primaryOptionArray = true
export default rule
// or, for plugins: stylelint.createPlugin(ruleName, rule)
```

There is one caveat here: If your rule accepts a primary option array, it cannot also accept a primary option object. Whenever possible, if you want your rule to accept a primary option array, you should just make an array the only possibility, instead of allowing for various data structures.

#### Secondary

Some rules require extra flexibility to address a variety of use-cases. These can use an **optional secondary options object**.

-   In `"color-hex-case": "upper"`, there is no secondary options object.
-   In `"indentation": [2, { "except": ["block"] }]`, the secondary options object is `{ "except": ["block"] }`.

The most typical secondary options are `"ignore": []` and `"except": []`; but anything is possible.

A rule's secondary option can be anything if you're not ignoring or making exceptions. As an example, `resolveNestedSelectors: true|false` is used within some `selector-*` rules to change how the rule processes nested selectors.

##### Keyword `"ignore"` and `"except"`

`"ignore"` and `"except"` accept an array of predefined keyword options e.g. `["relative", "first-nested", "descendant"]`.

-   Use `"ignore"` when you want the rule to simply skip-over a particular pattern.
-   Use `"except"` when you want to invert the primary option for a particular pattern.

##### User-defined `"ignore*"`

Use a more specific secondary option name when accepting a *user-defined* list of things to ignore. This takes the form of `"ignore<Things>": []` e.g. use `"ignoreAtRules": []` if a rule checks at-rules and you want to allow a user to specify which particular at-rule types to ignore.

### Determine violation messages

Messages take one of these forms:

-   "Expected \[something\] \[in some context\]".
-   "Unexpected \[something\] \[in some context\]."

Look at the messages of other rules to glean more conventions and patterns.

### Write the rule

*When writing the rule, always look to other similar rules for conventions and patterns to start from and mimic.*

You will use the simple [PostCSS API](http://api.postcss.org/) to navigate and analyze the CSS syntax tree. We recommend using the `walk` iterators (e.g. `walkDecls`), rather than using `forEach` to loop through the nodes.

Depending on the rule, we also recommend using [postcss-value-parser](https://github.com/TrySound/postcss-value-parser) and [postcss-selector-parser](https://github.com/postcss/postcss-selector-parser). There are significant benefits to using these parsers instead of regular expressions or `indexOf` searches (even if they aren't always the most performant method).

stylelint has a number of [utility functions](https://github.com/stylelint/stylelint/tree/master/lib/utils) that are used in existing rules and might prove useful to you, as well. Please look through those so that you know what's available. (And if you have a new function that you think might prove generally helpful, let's add it to the list!). You will definitely want to use `validateOptions()` util so that users are warned about invalid options. (Looking at other rules for examples of options validation will help a lot.). You should also make use of the `isStandardSyntax*` utilities to ignore non-standard syntax.

The rule should be strict *by default*. The user can make the rule more permissive by using the `"ignore*:"` secondary options.

The rule should not include code for methodologies or language extensions. Instead, provide generic secondary options so that the user can ignore these at the *configuration level*. For example, when dealing with specificity, a rule should not account for the `:global` and `:local` psuedo-classes (introduced in the CSS Modules language extension), instead the rule should provide a `ignorePsuedoClasses: []` secondary option. Methodologies come and go quickly, and this approach ensures the code base does not become littered with code for obsolete things.

Only add an option to a rule if it addresses a *requested* use case. Do not add an option to a rule, even for the sake of consistency, if there has been no request. This is to avoid polluting the tool with unused features.

### Adding autofixing

Depending on the rule, it might be possible to automatically fix the rule's violations by mutating the PostCSS AST (Abstract Syntax Tree) using the [PostCSS API](http://api.postcss.org/).

Add `context` variable to rule parameters:

```js
function rule(primary, secondary, context) {
  return (root, result) => {..}
}
```

`context` is an object which could have two properties:

-   `fix`(boolean): If `true`, your rule can apply autofixes.
-   `newline`(string): Line-ending used in current linted file.

If `context.fix` is `true`, then change `root` using PostCSS API and return early before `report()` is called.

```js
if (context.fix) {
  // Apply fixes using PostCSS API
  return // Return and don't report a problem
}

report(...)
```

### Write tests

Each rule must be accompanied by tests that contain:

-   All patterns that are considered violations.
-   All patterns that should *not* be considered violations.

It is easy to write stylelint tests, so *write as many as you can stand to*.

#### Checklist

Please run through this checklist and ensure each point is covered by your tests. Especially *consider the edge-cases*. These are where the bugs and shortcomings of rules always arise.

##### Best practices

-   Ensure you are testing errors in multiple positions, not the same place every time.
-   Ensure you use realistic (if simple) CSS, and avoid the use of ellipses.
-   Ensure you use standard CSS syntax by default, and only swap parsers when testing a specific piece of non-standard syntax.
-   When accessing raw strings from the PostCSS AST, use `node.raws` instead of `node.raw()`. This will ensure string corresponds exactly to the original.

##### Commonly overlooked edge-cases

-   How does your rule handle variables (`$sass`, `@less`, or `var(--custom-property)`)?
-   How does your rule handle CSS strings (e.g. `content: "anything goes";`)?
-   How does your rule handle CSS comments (e.g. `/* anything goes */`)?
-   How does your rule handle `url()` functions, including data URIs (e.g. `url(anything/goes.jpg)`)?
-   How does your rule handle vendor prefixes (e.g. `@-webkit-keyframes name {}`)?
-   How does your rule handle case sensitivity (e.g. `@KEYFRAMES name {}`)?
-   How does your rule handle a pseudo-class *combined* with a pseudo-element (e.g. `a:hover::before`)?
-   How does your rule handle nesting (e.g. do you resolve `& a {}`, or check it as is?)?
-   How does your rule handle whitespace and punctuation (e.g. comparing `rgb(0,0,0)` with `rgb(0, 0, 0)`)?

#### Running tests

You can run the tests via:

```console
npm test
```

However, this runs all 25,000+ unit tests and also linting.

You can use the interactive testing prompt to run tests for just a chosen set of rules (which you'll want to do during development). For example, to run the tests for just the `color-hex-case` and `color-hex-length` rules:

1.  Use `npm run watch` to start the prompt.
2.  Press `p` to filter by a filename regex pattern.
3.  Enter `color-hex-case|color-hex-length` i.e. each rule name separated by the pipe symbol (`|`).

### Write the README

Each rule must be accompanied by a README, fitting the following format:

1.  Rule name.
2.  Single line description.
3.  Prototypical code example.
4.  Expanded description (if necessary).
5.  Options.
6.  Example patterns that are considered violations (for each option value).
7.  Example patterns that are *not* considered violations (for each option value).
8.  Optional options (if applicable).

Look at the READMEs of other rules to glean more conventional patterns. These include:

-   Using "This rule" to refer to the rule e.g. "This rule ignores ..."
-   Aligning the arrows within the prototypical code example with the beginning of the construct being highlighted.
-   Aligning the text within the prototypical code example as far to the left as possible.

For example:

```css
 @media screen and (min-width: 768px) {}
/**                 ↑          ↑
  *       These names and values */
```

#### Single line descriptions

Take the form of:

-   "Disallow ..." (for `no` rules).
-   "Limit ..." (for `max` rules).
-   "Require ..." (for rules that accept `"always"` and `"never"` options).
-   "Specify ..." (for everything else).

#### Example patterns

-   Use complete CSS patterns i.e. avoid ellipses (`...`)
-   Use standard CSS syntax (and use `css` code fences) by default.
-   Use the minimum amount of code possible to communicate the pattern e.g. if the rule targets selectors then use an empty rule e.g. `{}`.
-   Use `{}`, rather than `{ }` for empty rules.
-   Use the `a` type selector by default.
-   Use the `@media` at-rules by default.
-   Use the `color` property by default.
-   Use *foo*, *bar* and *baz* for names e.g. `.foo`, `#bar` `--baz`

### Wire up the rule

The final step is to add references to the new rule in the following places:

-   [The rules `index.js` file](https://github.com/stylelint/stylelint/blob/master/lib/rules/index.js)
-   [The list of rules](../user-guide/rules.md)
-   [The example config](../user-guide/example-config.md)

Once you have something to show, you'll create a [pull request](https://github.com/stylelint/stylelint/compare) to continue the conversation.

## Adding an option to an existing rule

First, open [an issue](https://github.com/stylelint/stylelint/issues/new) about the option you wish to add. We'll discuss its functionality and name there.

Once we've agreed on the direction, you can work on a pull request. Here are the steps you'll need to take:

1.  Run `npm run watch` to start the interactive testing prompt.
2.  Use the `p` command to filter the active tests to just the rule you're working on.
2.  Change the rule's validation to allow for the new option.
3.  Add to the rule some logic (as little as possible) to make the option work.
4.  Add new unit tests to test the option.
5.  Add documentation about the new option.

## Fixing a bug in an existing rule

Fixing bugs is usually very easy. Here is a process that works:

1.  Run `npm run watch` to start the interactive testing prompt.
2.  Use the `p` command to filter the active tests to just the rule you're working on.
3.  Write failing unit tests that exemplify the bug.
4.  Fiddle with the rule until those new tests pass.

That's it! **If you are unable to figure out how to fix the bug yourself, it is still helpful to submit a pull request with your failing test cases.** It means that somebody else can jump right in and help out with the rule's logic.

## Deprecating a rule

Deprecating rules doesn't happen very often. However, these two steps are important to do:

1.  Point the `stylelintReference` link to the specific version of the rule README on the GitHub website, so that it is always accessible.
2.  Add the appropriate meta data to mark the rule as deprecated.

## Improving the performance of a new or an existing rule

There's a simple way to run benchmarks on any given rule with any valid config for it:

```shell
npm run benchmark-rule -- [rule-name] [config]
```

If the `config` argument is anything other than a string or a boolean, it must be valid JSON wrapped in quotation marks.

```shell
npm run benchmark-rule -- selector-combinator-space-after never
```

```shell
npm run benchmark-rule -- selector-combinator-space-after always
```

```shell
npm run benchmark-rule -- selector-no-combinator true
```

```shell
npm run benchmark-rule -- block-opening-brace-space-before "[\"always\", {\"ignoreAtRules\": [\"else\"]}]"
```

The script loads Bootstrap's CSS (from its CDN) and runs it through the configured rule.

It will end up printing some simple stats like this:

```shell
Warnings: 1441
Mean: 74.17598357142856 ms
Deviation: 16.63969674310928 ms
```

What can you do with this? **When writing new rules or refactoring existing rules, use these measurements to determine the efficiency of your code.**

A stylelint rule can repeat it's core logic many, many times (e.g. checking every value node of every declaration in a vast CSS codebase). So it's worth paying attention to performance and doing what we can to improve it!

**This is a great way to contribute if you just want a quick little project.** Try picking a rule and seeing if there's anything you can do to speed it up.

Make sure to include benchmark measurements in your PR's!
