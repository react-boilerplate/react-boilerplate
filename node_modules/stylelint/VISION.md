# Vision

A mighty, modern linter and fixer for CSS and CSS-like languages.

One that is:

-   Complete - with coverage of all standard CSS syntax.
-   Extensible - with multiple points of extension.
-   Configurable - with no defaults and plenty of options to tailor the linter.
-   Robust - with comprehensive test coverage and a wide range of fixtures.
-   Consistent - with conventions for behaviour, naming and documentation.
-   Performant - with tools to test and improve performance.

## Complete

Provide built-in rules for the following three areas:

-   [Possible errors](docs/user-guide/rules.md#possible-errors).
-   [Limit language features](docs/user-guide/rules.md#limit-language-features).
-   [Stylistic issues](docs/user-guide/rules.md#stylistic-issues).

### Possible errors

Provide rules to catch two types of possible errors:

-   Invalid code e.g. invalid hex colors and unknown language features.
-   Code that is valid but likely has unintended consequences e.g. duplicates and overrides.

Invalid code is best handled by emerging dedicated tools e.g. [csstree](https://github.com/csstree/csstree) - a language parser with syntax validation. As a stop-gap, while these tools mature, provide invalid code rules for the simplest of cases.

(In the future, these tools can be wrapped as plugins to make use of features such as `/* stylelint-* */` command comments, severity levels, and options validator.)

### Limit language features

Provide rules to limit what language features can be used, including:

-   Enforcing a maximum specificity by limiting the specificity itself or the occurrence of different selector types e.g. class, ID, attribute etc.
-   Enforcing best practices _at the configuration level_ e.g. disallowing the `all` keyword for transitions as it is not performant.
-   Enforcing the use of a subset of features to improve consistency across a code base e.g. limiting what units are allowed (`px` or `rem` etc.)
-   Enforcing specific patterns for selectors and names (e.g. those of custom properties).

### Stylistic issues

Provide rules to enforce a diverse range of stylistic conventions, including:

-   Whitespace
-   Case
-   Quotes

There are two approaches to enforcing stylistic conventions:

-   A machine algorithmically pretty prints the code (usually based on a maximum line length).
-   A human initially formats the code, and a machine fixes-up/warns-about any mistakes.

The former is handled by pretty printers, like [prettier](https://github.com/prettier/prettier), whereas the latter is catered for by the built-in stylistic rules.

Additionally, the built-in stylistic rules and plugins are configurable to support this diverse range of stylistic conventions. This is in contrast to pretty printers, which tend to be opinionated. The ordering of properties within declaration blocks is an example of a divisive topic, where there is no one or two dominant conventions. The [`stylelint-order`](https://www.npmjs.com/package/stylelint-order) plugin adheres to stylelint's philosophies, and can be used to lint and fix a diverse range of ordering conventions.

Another example is the use of single line rules for sets of _related_ rules e.g.

```css
/* Single line related classes */
.class-1 { top: 0; bottom: 0; }
.class-2 { top: 5px; right: 0; }
.class-3 { top: 8px; left: 0; }
```

The built-in stylistic rules can be configured to allow both multi-line and single-line rules. The choice of when to use each belongs to the user, who can determine which rules are related.

## Extensible

Provide multiple points of extensions, including:

-   [Plugins](docs/developer-guide/plugins.md) - build community rules to support methodologies, toolsets, non-standard CSS features, or very specific use cases.
-   [Processors](docs/user-guide/processors.md) - lint the CSS within non-stylesheet files.
-   [Extendable configs](docs/user-guide/configuration.md#extends) - extend and share configurations.
-   [Formatters](docs/developer-guide/formatters.md) - format stylelint result objects.
-   [Custom syntax](docs/user-guide/node-api.md#customsyntax) - use any PostCSS-compatible syntax module.

## Robust

Provide a robust tool with a [comprehensive test suite](docs/developer-guide/rules.md#write-tests), including:

-   High coverage, currently over 95%.
-   A wide range of fixtures for rules, currently over 10000.

## Consistent

Provide consistency throughout, including:

-   Consistent [names](docs/developer-guide/rules.md#naming-a-rule), [options](docs/developer-guide/rules.md#determining-options), [violation messages](docs/developer-guide/rules.md#determine-violation-messages), [documentation](docs/developer-guide/rules.md#write-the-readme) and [treatment](docs/developer-guide/rules.md#write-the-rule) of non-standard syntax within/of rules.
-   Consistent [requirements for inclusion](docs/developer-guide/rules.md#criteria-for-inclusion).

## Performant

Provide a fast tool, and the means to test and improve performance, including:

-   [Benchmarking](docs/developer-guide/rules.md#improving-the-performance-of-a-new-or-an-existing-rule) of an individual rule's performance.
