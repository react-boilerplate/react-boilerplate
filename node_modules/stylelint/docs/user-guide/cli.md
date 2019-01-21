# The stylelint CLI

## Installation

stylelint is an [npm package](https://www.npmjs.com/package/stylelint). Install it using:

```shell
npm install -g stylelint
```

<!-- TOC -->

## Usage

`stylelint --help` prints the CLI documentation.

The CLI outputs formatted results into `process.stdout`, which you can read with your human eyes or pipe elsewhere (e.g. write the information to a file).

### Examples

When you run commands similar to the examples below, be sure to include the quotation marks around file globs. This ensures that you can use the powers of [globby](https://github.com/sindresorhus/globby) (like the `**` globstar) regardless of your shell.

Looking for `.stylelintrc` and linting all `.css` files in the `foo` directory:

```shell
stylelint "foo/*.css"
```

Looking for `.stylelintrc` and linting all `<style>` blocks within the `.html` files in the `bar` directory:

```shell
stylelint "bar/*.html"
```

Looking for `.stylelintrc` and linting `stdin`:

```shell
echo "a { color: pink; }" | stylelint
```

Using `bar/mySpecialConfig.json` as config to lint all `.css` files in the `foo` directory, then writing the output to `myTestReport.txt`:

```shell
stylelint "foo/*.css" --config bar/mySpecialConfig.json > myTestReport.txt
```

Using `bar/mySpecialConfig.json` as config, with quiet mode on, to lint all `.css` files in the `foo` directory and any of its subdirectories and also all `.css` files in the `bar directory`, then writing the JSON-formatted output to `myJsonReport.json`:

```shell
stylelint "foo/**/*.css bar/*.css" -q -f json --config bar/mySpecialConfig.json > myJsonReport.json
```

Linting all `.css` files except those within `docker` subfolders, using negation in the input glob:

```shell
stylelint "**/*.css, !**/docker/**"
```

Caching processed `.scss` files in order to operate only on changed ones in the `foo` directory, using the `cache` and `cache-location` options:

```shell
stylelint "foo/**/*.scss" --cache --cache-location "/Users/user/.stylelintcache/"
```

Linting all the `.css` files in the `foo` directory, using the `syntax` option:

```shell
stylelint "foo/**/*.css" --syntax scss
```

In addition to `--syntax scss`, stylelint supports `--syntax sass`, `--syntax less`, and `--syntax sugarss` by default. If you're using one of the default syntaxes, you may not need to provide a `--syntax` option as non-standard syntaxes can be automatically inferred from the following:

-   The following file extensions: `.sass`, `.scss`, `.less`, and `.sss`.
-   The following values for the `lang` or `type` attribute on `<style>` tags (e.g. `lang="scss"`, `type="text/scss"`): `scss`, `less` and `sugarss`.
-   The following Markdown code fencing markers (e.g. ```` ```scss ````): `scss`, `less` and `sugarss`.

Additionally, stylelint can accept a custom [PostCSS-compatible syntax](https://github.com/postcss/postcss#syntaxes). To use a custom syntax, supply a syntax module name or path to the syntax file: `--custom-syntax custom-syntax` or `--custom-syntax ./path/to/custom-syntax`.

Note, however, that stylelint can provide no guarantee that core rules will work with syntaxes other than the defaults listed above.

### Recursively linting a directory

To recursively lint a directory, using the `**` globstar:

```shell
stylelint "foo/**/*.scss"
```

The quotation marks around the glob are important because they will allow stylelint to interpret the glob, using node-glob, instead of your shell, which might not support all the same features.

### Autofixing errors

With `--fix` option stylelint will fix as many errors as possible. The fixes are made to the actual source files. All unfixed errors will be reported.

Linting all `.css` files in the `foo` directory. And fixing source files if violated rules support autofixing:

```shell
stylelint "foo/*.css" --fix
```

**Note:** It's an _experimental_ feature. It currently does not respect special comments for disabling stylelint within sources (e. g. `/* stylelint-disable */`). Autofixing will be applied regardless of these comments.

If you're using both these special comments and autofixing, please run stylelint twice as a temporary solution. On the first run, some violations could be missed, or some violations might be reported incorrectly.

For CSS with standard syntax, stylelint will use [postcss-safe-parser](https://github.com/postcss/postcss-safe-parser) to fix syntax errors.

## Syntax errors

The CLI informs you about syntax errors in your CSS.
It uses the same format as it uses for linting violations.
The error name is `CssSyntaxError`.

## Exit codes

The CLI can exit the process with the following exit codes:

-   1: Something unknown went wrong.
-   2: At least one rule with an "error"-level severity triggered at least one violations.
-   78: There was some problem with the configuration file.
-   80: A file glob was passed, but it found no files.
