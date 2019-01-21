# FAQ

<!-- TOC -->

## How do I turn off, disable or ignore a rule?

You can turn off a rule by setting its config value to `null`.

For example, to use `stylelint-config-standard` without the `at-rule-empty-line-before` rule:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-empty-line-before": null
  }
}
```

You can also turn off a rule for specific sections of your CSS. Refer to the rules section of the [configuration guide](configuration.md#rules) for more information.

## How do I lint from the command line?

Refer to the [CLI section](cli.md) of the docs.

The CLI can also be used from within [npm run scripts](https://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) to use a non-global installation of stylelint.

## How do I lint using Git pre-commit hooks?

[lint-staged](https://github.com/okonet/lint-staged) is a NodeJS script that supports running stylelint against Git staged files.

## How do I lint using my task runner of choice?

The stylelint community maintains a [handful of plugins](complementary-tools.md#build-tool-plugins) for popular task runners, including ones for gulp, webpack, Broccoli and Grunt. Refer to their individual READMEs to get started.

If there isn't a dedicated stylelint plugin for your task runner of choice, you can use stylelint as a PostCSS plugin and make use of PostCSS's [numerous](https://github.com/postcss/postcss#runners) task runner plugins.

There are also examples of using the PostCSS plugin via the PostCSS JS API within the [docs](postcss-plugin.md).

However, using stylelint as a PostCSS plugin limits your reporting options to [postcss-reporter](https://github.com/postcss/postcss-reporter/). We recommend using the stylelint CLI or Node API, instead, for better reporting.

## How do I lint within my text editor?

The stylelint community also maintains a [handful of plugins](complementary-tools.md#editor-plugins) for popular editors. Refer to their individual READMEs to get started.

## How do I lint SCSS, Less, or other non-standard syntax?

stylelint can *parse* any the following non-standard syntaxes by default: Sass, Less and SugarSS. Non-standard syntaxes can automatically be inferred from the following file extensions `.sass`, `.scss`, `.less`, and `.sss`; or else you can specify the syntax yourself.

Additionally, stylelint can accept any [PostCSS-compatible syntax](https://github.com/postcss/postcss#syntaxes) when using the CLI or Node API. Note, however, that stylelint can provide no guarantee that core rules will work with syntaxes other than the defaults listed above.

Refer to the [docs](css-processors.md#parsing-non-standard-syntax) on how to configure stylelint to parse non-standard syntaxes.

## Should I lint before or after processing my stylesheets through PostCSS plugins or other processors?

We [recommend](css-processors.md) linting your source files before any transformations.

## How do I lint styles within `<style>` tags?

[Create a processor](../developer-guide/processors.md) or [use an existing one](configuration.md#processors) that extracts CSS from your HTML's `<style>` tags and feeds it into stylelint.

## How do I automatically fix stylistic violations?

Use the `--fix` CLI flag or the `fix` Node API option to fix a number of stylistic violations with this *experimental* feature.

## How do I manage conflicts between rules?

Each rule stands alone, so sometimes it's possible to configure rules such that they conflict with one another. For example, you could turn on two conflicting blacklist and whitelist rules, e.g. `unit-blacklist` and `unit-whitelist`.

It's your responsibility as the configuration author to resolve these conflicts.

## What is the difference between a plugin and a rule?

A rule must meet the [criteria](../developer-guide/rules.md) set out in the developer guide, including being applicable to only standard CSS syntax, and having a clear and unambiguous finished state. Whereas a plugin is a rule or sets of rules built by the community that don't adhere to the criteria. It might support a particular methodology or toolset, or apply to *non-standard* constructs and features, or be for specific use cases.

For example, we've found that rules to enforce property order, property groupings, etc., work better as plugins, because there are so many different opinions about what to enforce, and how. When you write or use a plugin, you can make sure to enforce your own particular preferences, exactly; but a rule that tries to address too many divergent use-cases becomes a mess.

Plugins are easy to incorporate into your configuration.

## Can I customise stylelint's messages?

Yes, you can either use the [`message` secondary option](configuration.md#custom-messages) or [write your own formatter](../developer-guide/formatters.md).

## How should I lint my CSS that follows a BEM-like methodology?

Use the [stylelint-selector-bem-pattern](https://github.com/davidtheclark/stylelint-selector-bem-pattern) plugin to ensure your selectors conform to a chosen BEM-flavor pattern.

You can also take advantage of the `selector-*` rules to ban certain types of selectors (e.g. id selectors) and control specificity.

If you're using SUITCSS, you might want to use [their shareable config](https://github.com/suitcss/stylelint-config-suitcss).

## How do I disallow single-line blocks?

```css
  a { color: red; }
/** ↑
 * Declaration blocks like this */
```

Use the `block-opening-brace-newline-after` and `block-opening-brace-newline-before` rules together. For example, this config:

```json
{
  "block-opening-brace-newline-after": ["always"],
  "block-closing-brace-newline-before": ["always"]
}
```

Would allow:

```css
a {
  color: red;
}
```

But not these patterns:

```css
a { color: red;
}

a {
color: red; }

a { color: red; }
```

To allow single-line blocks but enforce newlines with multi-line blocks, use the `"always-multi-line"` option for both rules.


## How do I configure the `*-pattern` rules for common CSS naming conventions like kebab-case?

Use the regex that corresponds to your chosen convention:

-   kebab-case: `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$`
-   lowerCamelCase: `^[a-z][a-zA-Z0-9]+$`
-   snake\_case: `^([a-z][a-z0-9]*)(_[a-z0-9]+)*$`
-   UpperCamelCase: `^[A-Z][a-zA-Z0-9]+$`

e.g. for lowerCamelCase class selectors, use `"selector-class-pattern": "^[a-z][a-zA-Z0-9]+$"`.

All these patterns disallow CSS identifiers that start with a digit, two hyphens, or a hyphen followed by a digit.

## How do I change the default severity to "warning" so stylelint doesn't break my build?

Use the [`defaultSeverity`](configuration.md#defaultseverity) configuration option.

## Can I bundle more than one sharable config within an npm package?

A user can `require()` any file in your npm package, so all you need to do is document which paths point to configs (e.g. `require('my-package/config-2')`).

## How can I control the whitespace after the open brace of the block?

Refer to [this](about-rules.md#-empty-line-before-and--max-empty-lines-rules) section of the docs that explains how the `*-empty-line-before` rules work.

## If I use `extends` within my configuration object, will the options for each rule be merged or overridden?

They will be overridden.

The `extends` mechanism is [detailed within the configuration docs](configuration.md#extends):

> When one configuration extends another, it starts with the other's properties then adds to and overrides what's there.

The reason for this design is documented in [#1646](https://github.com/stylelint/stylelint/issues/1646#issuecomment-232779957).
