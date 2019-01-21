# stylelint

[![Backers on Open Collective](https://opencollective.com/stylelint/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/stylelint/sponsors/badge.svg)](#sponsors) [![NPM version](https://img.shields.io/npm/v/stylelint.svg)](https://www.npmjs.org/package/stylelint) [![Build Status](https://travis-ci.org/stylelint/stylelint.svg?branch=master)](https://travis-ci.org/stylelint/stylelint) [![Build status](https://ci.appveyor.com/api/projects/status/wwajr0886e00g8je/branch/master?svg=true)](https://ci.appveyor.com/project/stylelint/stylelint/branch/master) [![NPM Downloads](https://img.shields.io/npm/dm/stylelint.svg)](https://npmcharts.com/compare/stylelint?minimal=true) [![Bountysource](https://www.bountysource.com/badge/tracker?tracker_id=9282518)](https://www.bountysource.com/trackers/9282518-stylelint?utm_source=9282518&utm_medium=shield&utm_campaign=TRACKER_BADGE)

A mighty, modern CSS linter and fixer that helps you avoid errors and enforce consistent conventions in your stylesheets.

## Features

-   **Over one hundred and sixty built-in rules.** Geared towards standard CSS syntax, these can:
    -   **Catch possible errors:** e.g., invalid standard CSS syntax, duplicates, and overrides.
    -   **Limit language features:** e.g.:
        -   Disallow specific units, properties, functions, and at-rules.
        -   Limit the specificity and quantity of selectors.
        -   Enforce patterns for selectors and custom properties.
    -   **Enforce stylistic conventions:** e.g., whitespace, case, notation, and quotes.
-   **Understands the latest CSS syntax:** Including custom properties, `calc()` and level 4 selectors.
-   **Completely unopinionated:** Only enable the rules you want, and configure them with options that tailor the linter to your needs.
-   **Support for plugins:** It's easy to create your own rules and add them to the linter, or make use of plugins written by the community.
-   **Automatically fixes some stylistic violations:** Save time by having stylelint fix your code with this *experimental* feature.
-   **Shareable configs:** If you don't want to craft your own config, you can extend a shareable config. Or you can craft your own config and share with your team and/or the community.
-   **Works with embedded styles:** Within `<style>` tags (used by Vue and Web Components) and Markdown code fences.
-   **Parses *CSS-like* syntaxes:** The linter is powered by [PostCSS](https://github.com/postcss/postcss), so it can be configured and extended to understand any syntax that PostCSS can parse, including Sass, [SugarSS](https://github.com/postcss/sugarss), and Less.
-   **Options validator:** So that you can be confident that your config is valid.
-   **Well tested:** Over ten thousand tests cover the internals and rules.
-   **Growing community**: Used by [Facebook](https://code.facebook.com/posts/879890885467584/improving-css-quality-at-facebook-and-beyond/), [GitHub](https://github.com/primer/stylelint-config-primer), [Wikimedia](https://github.com/wikimedia/stylelint-config-wikimedia), [GSA](https://github.com/18F/stylelint-rules/), and [WordPress](https://github.com/ntwb/stylelint-config-wordpress/) among others.

## Example output

![Example](https://github.com/stylelint/stylelint/raw/master/example.png?raw=true)

## Getting started

With stylelint, it's easy to start linting your CSS:

1.  Decide how you want to use stylelint:
    -   [via the stylelint CLI](docs/user-guide/cli.md)
    -   [via a plugin for your text editor](docs/user-guide/complementary-tools.md#editor-plugins) (atom, vscode etc)
    -   [via a plugin for your build tool](docs/user-guide/complementary-tools.md#build-tool-plugins) (webpack, gulp etc)
    -   [via the stylelint Node API](docs/user-guide/node-api.md)
    -   [via the stylelint PostCSS plugin](docs/user-guide/postcss-plugin.md)
2.  Create your [configuration object](docs/user-guide/configuration.md) by either extending a shared config or crafting your own:
    -   To extend a shared config, we suggest using either [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard) or [`stylelint-config-recommended`](https://github.com/stylelint/stylelint-config-recommended). We update the configs with each new release of stylelint, so it's easy to stay up to date. Both configs are geared towards standard CSS syntax. If you use non-standard syntax (like `@if` etc.) then you might want to use a community config designed for that syntax e.g. [`stylelint-config-recommended-scss`](https://github.com/kristerkari/stylelint-config-recommended-scss). The recommended config turns on just the [possible error](docs/user-guide/rules.md#possible-errors) rules. The standard config builds on top of the recommended config by additionally turning on over 60 of stylelint's [stylistic rules](docs/user-guide/rules.md#stylistic-issues) with sensible defaults. You can always override specific rules after extending either config. When using either config, you'll likely want to add (and configure to your specific needs) some of the rules that [limit language features](docs/user-guide/rules.md#limit-language-features). Alternately, you can [search for another](https://www.npmjs.com/browse/keyword/stylelint-config) community config and [extend](docs/user-guide/configuration.md#extends) that instead.
    -   To craft your own config, first [learn about how rules are named and how they work together](docs/user-guide/about-rules.md), then either:
        -   Start small and only learn about [the rules](docs/user-guide/rules.md) you want to turn on and enforce. *All of the rules are off by default*, and so you can start small, growing your config over time as you have a chance to explore more of the rules.
        -   Or copy-paste [this example configuration](docs/user-guide/example-config.md), which lists all of stylelint's rules and their primary options. Then you can edit the options of each rule to your liking, and remove (or turn off with `null`) the rules that you don't care to enforce.
3.  Lint!

## Guides

You'll find more detailed information on using stylelint and tailoring it to your needs in our guides:

-   [User guide](docs/user-guide.md) - Usage, configuration, FAQ and complementary tools.
-   [Developer guide](docs/developer-guide.md) - Contributing to stylelint and writing your own plugins & formatters.

## Need help?

If you're looking for help or have a support question, then check out our [FAQ](docs/user-guide/faq.md) first. If the answer to your problem isn't there, then go to [stackoverflow](https://stackoverflow.com/questions/tagged/stylelint). stackoverflow is a huge Question and Answer community, and tagging your post there with "stylelint" will catch the stylelint team's attention.

If you think you've found a bug or if you have feature request, then create a [new GitHub issue](https://github.com/stylelint/stylelint/issues/new). Be sure to follow the issue template, answering each question, as this helps us greatly in understanding your problem or request.

Upgrading? Please read our [CHANGELOG](CHANGELOG.md) to learn what changes to expect in the latest version, whether that's new features, bug fixes, renamed rules, or whatever else.

## Help out

There is always a lot of work to do, and already well over 150 rules to maintain. So please help out in any way that you can:

-   Chime in on any open [issue](https://github.com/stylelint/stylelint/issues) or [pull request](https://github.com/stylelint/stylelint/pulls).
-   Create, enhance, and debug rules (see our guide to ["Working on rules"](docs/developer-guide/rules.md)).
-   Improve [documentation](docs/).
-   Add new tests to *absolutely anything*.
-   Work on [improving performance of rules](docs/developer-guide/rules.md#improving-the-performance-of-a-new-or-an-existing-rule).
-   Open new issues about your ideas for making stylelint better, and pull requests to show us how your idea works.
-   Create or contribute to ecosystem tools, like the plugins for [Atom](https://github.com/AtomLinter/linter-stylelint) and [Sublime Text](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint).

Interested in the project vision? Please read our [VISION document](VISION.md).

## Semantic Versioning Policy

stylelint follows [semantic versioning](http://semver.org). However, due to the nature of stylelint as a code quality tool, it's not always clear when a minor or major version bump occurs. To help clarify this for everyone, based on ESLint's [semantic versioning policy](https://github.com/eslint/eslint#semantic-versioning-policy) we've defined the following semantic versioning policy for stylelint:

-   Patch release (intended to not break your lint build)
    -   A bug fix in a rule that results in stylelint reporting fewer errors.
    -   A bug fix to the CLI or core (including formatters).
    -   Improvements to documentation.
    -   Non-user-facing changes such as refactoring code, adding, deleting, or modifying tests, and increasing test coverage.
    -   Re-releasing after a failed release (i.e., publishing a release that doesn't work for anyone).

-   Minor release (might break your lint build)
    -   A bug fix in a rule that results in stylelint reporting more errors.
    -   A new rule is created.
    -   A new option to an existing rule that does not result in stylelint reporting more errors by default.
    -   An existing rule is deprecated.
    -   A new CLI capability is created.
    -   New capabilities to the public API are added (new classes, new methods, new arguments to existing methods, etc.).
    -   A new formatter is created.

-   Major release (likely to break your lint build)
    -   A change in the documented behaviour of an existing rule results in stylelint reporting more errors by default.
    -   An existing rule is removed.
    -   An existing formatter is removed.
    -   Part of the public API is removed or changed in an incompatible way.

According to our policy, any minor update may report more errors than the previous release (ex: from a bug fix). As such, we recommend using the tilde (`~`) in `package.json` e.g. `"stylelint": "~7.2.0"` to guarantee the results of your builds.

[License](https://raw.githubusercontent.com/stylelint/stylelint/master/LICENSE)

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="https://github.com/stylelint/stylelint/graphs/contributors"><img src="https://opencollective.com/stylelint/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/stylelint#backer)]

<a href="https://opencollective.com/stylelint#backers" target="_blank"><img src="https://opencollective.com/stylelint/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/stylelint#sponsor)]

<a href="https://opencollective.com/stylelint/sponsor/0/website" target="_blank"><img src="https://opencollective.com/stylelint/sponsor/0/avatar.svg"></a>
