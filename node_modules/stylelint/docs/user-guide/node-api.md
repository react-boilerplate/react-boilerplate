# The stylelint Node API

The stylelint module includes a `lint()` function that provides the Node API.

```js
stylelint.lint(options)
  .then(function(resultObject) { .. });
```

<!-- TOC -->

## Installation

stylelint is an [npm package](https://www.npmjs.com/package/stylelint). Install it using:

```console
npm install stylelint
```

## Options

Options is an object with the following properties.

Though both `files` and `code` are "optional", you *must* have one and *cannot* have both. All other options are optional.

### `code`

A CSS string to be linted.

### `codeFilename`

If using `code` to pass a source string directly, you can use `codeFilename` to associate that code with a particular filename.

This can be useful, for example, when making a text editor plugin that passes in code directly but needs to still use the configuration's `ignoreFiles` functionality to possibly ignore that code.

### `config`

A [stylelint configuration object](configuration.md).

If no `config` or `configFile` is passed, stylelint will use a [config lookup algorithm](./configuration.md#loading-the-configuration-object) to find the correct config.

### `configBasedir`

An absolute path to the directory that relative paths defining `extends` and `plugins` are *relative to*.

If the `config` object passed uses relative paths, e.g. for `extends` or `plugins`, you are going to have to pass a `configBasedir`. If not, you do not need this.

### `configFile`

The path to a JSON, YAML, or JS file  that contains your [stylelint configuration object](configuration.md).

It should be either absolute or relative to the directory that your process is running from (`process.cwd()`). We'd recommend absolute.

### `configOverrides`

A partial stylelint configuration object whose properties will override the existing config object, whether that config was loaded via the `config` option or a `.stylelintrc` file.

The difference between the `configOverrides` and `config` options is this: If any `config` object is passed, stylelint does not bother looking for a `.stylelintrc` file and instead just uses whatever `config` object you've passed; but if you want to *both* load a `.stylelintrc` file *and* override specific parts of it, `configOverrides` does just that.

### `files`

A file glob, or array of file globs. Ultimately passed to [globby](https://github.com/sindresorhus/globby) to figure out what files you want to lint.

Relative globs are considered relative to `globbyOptions.cwd`.

By default, all `node_modules` and `bower_components` are ignored.

### `globbyOptions`

The options that will be passed with `files` when use globby.

For example, you can set a specific `cwd` manually, which is a folder path of current working directory for `files` glob. Relative globs in `files` are considered relative to this path. And by default, `cwd` will be set by `process.cwd()`.

For more detail usage, see [Globby Guide](https://github.com/sindresorhus/globby#options).

### `formatter`

Options: `"compact"|"json"|"string"|"unix"|"verbose"`, or a function. Default is `"json"`.

Specify the formatter that you would like to use to format your results.

If you pass a function, it must fit the signature described in the [Developer Guide](../developer-guide/formatters.md).

### `ignoreDisables`

If `true`, all disable comments (e.g. `/* stylelint-disable block-no-empty */`) will be ignored.

You can use this option to see what your linting results would be like without those exceptions.

### `disableDefaultIgnores`

If `true`, stylelint will not automatically ignore the contents of `node_modules` and `bower_components`. (By default, these directories are automatically ignored.)

### `cache`

Store the info about processed files in order to only operate on the changed ones the next time you run stylelint. Enabling this option can dramatically improve stylelint's speed, because only changed files will be linted.

By default, the cache is stored in `.stylelintcache` in `process.cwd()`. To change this, use the `cacheLocation` option.

**Note:** If you run stylelint with `cache` and then run stylelint without `cache`, the `.stylelintcache` file will be deleted. This is necessary because we have to assume that `.stylelintcache` was invalidated by that second command.

### `cacheLocation`

A path to a file or directory to be used for `cache`. Only meaningful alongside `cache`. If no location is specified, `.stylelintcache` will be created in `process.cwd()`.

If a directory is specified, a cache file will be created inside the specified folder. The name of the file will be based on the hash of `process.cwd()` (e.g. `.cache_hashOfCWD`). This allows stylelint to reuse a single location for a variety of caches from different projects.

**Note:** If the directory of `cacheLocation` does not exist, make sure you add a trailing `/` on \*nix systems or `\` on Windows. Otherwise, the path will be assumed to be a file.

### `reportNeedlessDisables`

If `true`, `ignoreDisables` will also be set to `true` and the returned data will contain a `needlessDisables` property, whose value is an array of objects, one for each source, with tells you which stylelint-disable comments are not blocking a lint violation.

Use this report to clean up your codebase, keeping only the stylelint-disable comments that serve a purpose.

*The recommended way to use this option is through the CLI.* It will output a clean report to the console.

### `maxWarnings`

Sets a limit to the number of warnings accepted. Will add a `maxWarningsExceeded` property to the returned data if the number of found warnings exceeds the given limit.
The value is an Object (e.g. `{ maxWarnings: 0, foundWarnings: 12 }`).

*The recommended way to use this option is through the CLI.* It will exit with code 2 when `maxWarnings` is exceeded.

### `ignorePath`

A path to a file containing patterns describing files to ignore. The path can be absolute or relative to `process.cwd()`. By default, stylelint looks for `.stylelintignore` in `process.cwd()`. See [Configuration](configuration.md#stylelintignore).

### `syntax`

Options: `"sass"|"scss"|"less"|"sugarss"|"html"|"styled"|"jsx"`

Force a specific non-standard syntax that should be used to parse source stylesheets.

If you do not specify a syntax, non-standard syntaxes will be automatically inferred.

See the [`customSyntax`](#customsyntax) option below if you would like to use stylelint with a custom syntax.

### `customSyntax`

An absolute path to a custom [PostCSS-compatible syntax](https://github.com/postcss/postcss#syntaxes) module.

Note, however, that stylelint can provide no guarantee that core rules will work with syntaxes other than the defaults listed for the `syntax` option above.

### `fix`

If `true`, stylelint will fix as many errors as possible. The fixes are made to the actual source files. All unfixed errors will be reported. See [Autofixing errors](cli.md#autofixing-errors) docs.

## The returned promise

`stylelint.lint()` returns a Promise that resolves with an object containing the following properties:

### `errored`

Boolean. If `true`, at least one rule with an "error"-level severity registered a violation.

### `output`

A string displaying the formatted violations (using the default formatter or whichever you passed).

### `postcssResults`

An array containing all the [PostCSS LazyResults](https://api.postcss.org/LazyResult.html) that were accumulated during processing.

### `results`

An array containing all the stylelint result objects (the objects that formatters consume).

## Syntax errors

`stylelint.lint()` does not reject the Promise when your CSS contains syntax errors.
It resolves with an object (see [The returned promise](#the-returned-promise)) that contains information about the syntax error.

## Usage examples

If `myConfig` contains no relative paths for `extends` or `plugins`, you do not have to use `configBasedir`:

```js
stylelint.lint({
  config: myConfig,
  files: "all/my/stylesheets/*.css"
})
  .then(function(data) {
    // do things with data.output, data.errored,
    // and data.results
  })
  .catch(function(err) {
    // do things with err e.g.
    console.error(err.stack);
  });
```

If `myConfig` *does* contain relative paths for `extends` or `plugins`, you *do* have to use `configBasedir`:

```js
stylelint.lint({
  config: myConfig,
  configBasedir: path.join(__dirname, "configs"),
  files: "all/my/stylesheets/*.css"
}).then(function() { .. });
```

Maybe you want to use a CSS string instead of a file glob, and you want to use the string formatter instead of the default JSON:

```js
stylelint.lint({
  code: "a { color: pink; }",
  config: myConfig,
  formatter: "string"
}).then(function() { .. });
```

Maybe you want to use my own custom formatter function and parse `.scss` source files:

```js
stylelint.lint({
  config: myConfig,
  files: "all/my/stylesheets/*.scss",
  formatter: function(stylelintResults) { .. },
  syntax: "scss"
}).then(function() { .. });
```

The same pattern can be used to read Less or [SugarSS](https://github.com/postcss/sugarss) syntax.
