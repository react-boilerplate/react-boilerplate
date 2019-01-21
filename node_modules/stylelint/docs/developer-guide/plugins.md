# Writing plugins

Plugins are rules and sets of rules built by the community.

We recommend familiarising yourself and adhering to stylelint's [conventions for writing rules](rules.md), including those for names, options, messages, tests and docs.

<!-- TOC -->

## The anatomy of a plugin

```js
// Abbreviated example
var stylelint = require("stylelint")

var ruleName = "plugin/foo-bar"
var messages =  stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected ...",
})

module.exports = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptionObject) {
  return function(postcssRoot, postcssResult) {
    var validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, { .. })
    if (!validOptions) { return }
    // ... some logic ...
    stylelint.utils.report({ .. })
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages
```

Your plugin's rule name must be namespaced, e.g. `your-namespace/your-rule-name`. If your plugin provides only a single rule or you can't think of a good namespace, you can simply use `plugin/my-rule`. This namespace ensures that plugin rules will never clash with core rules. *Make sure you document your plugin's rule name (and namespace) for users, because they will need to use it in their config.*

`stylelint.createPlugin(ruleName, ruleFunction)` ensures that your plugin will be setup properly alongside other rules.

In order for your plugin rule to work with the [standard configuration format](../user-guide/configuration.md#rules), `ruleFunction` should accept 2 arguments: the primary option and, optionally, a secondary options object.

If your plugin rule supports [autofixing](rules.md#adding-autofixing), then `ruleFunction` should also accept a third argument: context. Also, it's highly recommended to support the `disableFix` option in your secondary options object. Within the rule, don't perform autofixing if the user has passed a `disableFix` option for your rule.

`ruleFunction` should return a function that is essentially a little [PostCSS plugin](https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md): it takes 2 arguments: the PostCSS Root (the parsed AST), and the PostCSS LazyResult. You'll have to [learn about the PostCSS API](https://github.com/postcss/postcss/blob/master/docs/api.md).

### Asynchronous rules

Rules with asynchronous PostCSS plugins are also possible! All you need to do is return a Promise instance from your plugin function.

```js
// Abbreviated asynchronous example
var stylelint = require("stylelint")

var ruleName = "plugin/foo-bar-async"
var messages =  stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected ...",
})

module.exports = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptionObject) {
  return function(postcssRoot, postcssResult) {
    var validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, { .. })
    if (!validOptions) { return }

    return new Promise(function(resolve) {
      // some async operation
      setTimeout(function() {
        // ... some logic ...
        stylelint.utils.report({ .. })
        resolve()
      }, 1)
    })
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages
```

## `stylelint.utils`

stylelint exposes some utilities that are useful. *For details about the APIs of these functions, please look at comments in the source code and examples in the standard rules.*

### `stylelint.utils.report`

Adds violations from your plugin to the list of violations that stylelint will report to the user.

*Do not use PostCSS's `node.warn()` method directly.* When you use `stylelint.utils.report`, your plugin will respect disabled ranges and other possible future features of stylelint, providing a better user-experience, one that better fits the standard rules.

### `stylelint.utils.ruleMessages`

Tailors your messages to the format of standard stylelint rules.

### `stylelint.utils.validateOptions`

Validates the options for your rule.

### `stylelint.utils.checkAgainstRule`

Checks CSS against a standard stylelint rule *within your own rule*. This function provides power and flexibility for plugins authors who wish to modify, constrain, or extend the functionality of existing stylelint rules.

Accepts an options object and a callback that is invoked with warnings from the specified rule. The options are:

-   `ruleName`: The name of the rule you are invoking.
-   `ruleSettings`: Settings for the rule you are invoking, formatting in the same way they would be in a `.stylelintrc` configuration object.
-   `root`: The root node to run this rule against.

Use the warning to create a *new* warning *from your plugin rule* that you report with `stylelint.utils.report`.

For example, imagine you want to create a plugin that runs `at-rule-no-unknown` with a built-in list of exceptions for at-rules provided by your preprocessor-of-choice:

```js
const allowableAtRules = [..]

function myPluginRule(primaryOption, secondaryOptions) {
  return (root, result) => {
    const defaultedOptions = Object.assign({}, secondaryOptions, {
      ignoreAtRules: allowableAtRules.concat(options.ignoreAtRules || []),
    })

    stylelint.utils.checkAgainstRule({
      ruleName: 'at-rule-no-unknown',
      ruleSettings: [primaryOption, defaultedOptions],
      root: root
    }, (warning) => {
      stylelint.utils.report({
        message: myMessage,
        ruleName: myRuleName,
        result: result,
        node: warning.node,
        line: warning.line,
        column: warning.column,
      })
    })
  }
}
```

## `stylelint.rules`

All of the rule functions are available at `stylelint.rules`. This allows you to build on top of existing rules for your particular needs.

A typical use-case is to build in more complex conditionals that the rule's options allow for. For example, maybe your codebase uses special comment directives to customize rule options for specific stylesheets. You could build a plugin that checks those directives and then runs the appropriate rules with the right options (or doesn't run them at all).

All rules share a common signature. They are a function that accepts two arguments: a primary option and a secondary options object. And that functions returns a function that has the signature of a PostCSS plugin, expecting a PostCSS root and result as its arguments.

Here's a simple example of a plugin that runs `color-hex-case` only if there is a special directive `@@check-color-hex-case` somewhere in the stylesheet:

```js
export default stylelint.createPlugin(ruleName, function (expectation) {
  const runColorHexCase = stylelint.rules["color-hex-case"](expectation)
  return (root, result) => {
    if (root.toString().indexOf("@@check-color-hex-case") === -1) return
    runColorHexCase(root, result)
  }
})
```

## Allow primary option arrays

If your plugin can accept an array as its primary option, you must designate this by setting the property `primaryOptionArray = true` on your rule function. For more information, check out the ["Working on rules"](rules.md#primary) doc.

## External helper modules

In addition to the standard parsers mentioned in the ["Working on rules"](rules.md) doc, there are other external modules used within stylelint that we recommend using. These include:

-   [normalize-selector](https://github.com/getify/normalize-selector): Normalize CSS selectors.
-   [postcss-resolve-nested-selector](https://github.com/davidtheclark/postcss-resolve-nested-selector): Given a (nested) selector in a PostCSS AST, return an array of resolved selectors.
-   [style-search](https://github.com/davidtheclark/style-search): Search CSS (and CSS-like) strings, with sensitivity to whether matches occur inside strings, comments, and functions.

Have a look through [stylelint's internal utils](https://github.com/stylelint/stylelint/tree/master/lib/utils) and if you come across one that you need in your plugin, then please consider helping us extract it out into an external module.

## Peer dependencies

You should express, within the `peerDependencies` key (and **not** within the `dependencies` key) of your plugin's `package.json`, what version(s) of stylelint your plugin can be used with. This is to ensure that different versions of stylelint are not unexpectedly installed.

For example, to express that your plugin can be used with stylelint versions 7 and 8:

```json
{
  "peerDependencies": {
    "stylelint": "^7.0.0 || ^8.0.0"
  }
}
```

## Testing plugins

For testing your plugin, you might consider using the same rule-testing function that stylelint uses internally: [`stylelint-test-rule-tape`](https://github.com/stylelint/stylelint-test-rule-tape).

## Plugin packs

To make a single module provide multiple rules, simply export an array of plugin objects (rather than a single object).

## Sharing plugins and plugin packs

-   Use the `stylelint-plugin` keyword within your `package.json`.
-   Once your plugin is published, please send us a Pull Request to add your plugin to [the list](../user-guide/plugins.md).
