# The stylelint PostCSS plugin

As with any other [PostCSS plugin](https://github.com/postcss/postcss#plugins), you can use stylelint's PostCSS plugin either with a PostCSS runner or with the PostCSS JS API directly.

*However, if a dedicated stylelint task runner plugin [is available](complementary-tools.md) (e.g. [gulp-stylelint](https://github.com/olegskl/gulp-stylelint) or [grunt-stylelint](https://github.com/wikimedia/grunt-stylelint)) we recommend you use that rather than this plugin, as they provide better reporting.*

<!-- TOC -->

## Installation

stylelint is an [npm package](https://www.npmjs.com/package/stylelint). Install it using:

```console
npm install stylelint
```

## Options

The plugin accepts an options object as argument, with the following properties:

### `config`

A [stylelint configuration object](configuration.md).

If no `config` or `configFile` is passed, stylelint will look for a `.stylelintrc` configuration file.

### `configFile`

The path to a JSON, YAML, or JS file that contains your [stylelint configuration object](configuration.md).

It should be either absolute or relative to the directory that your process is running from (`process.cwd()`). We'd recommend absolute.

### `configBasedir`

An absolute path to the directory that relative paths defining `extends` and `plugins` are *relative to*.

This is only necessary if you passed an object directly through the `config` property. If you used
`configFile`, this option is not necessary.

If the `config` object passed uses relative paths, e.g. for `extends` or `plugins`, you are going to have to pass a `configBasedir`. If not, you do not need this.

### `configOverrides`

A partial stylelint configuration object whose properties will override the existing config object, whether that config was loaded via the `config` option or a `.stylelintrc` file.

The difference between the `configOverrides` and `config` options is this: If any `config` object is passed, stylelint does not bother looking for a `.stylelintrc` file and instead just uses whatever `config` object you've passed; but if you want to *both* load a `.stylelintrc` file *and* override specific parts of it, `configOverrides` does just that.

### `ignoreDisables`

If `true`, all disable comments (e.g. `/* stylelint-disable block-no-empty */`) will be ignored.

You can use this option to see what your linting results would be like without those exceptions.

### `ignorePath`

A path to a file containing patterns describing files to ignore. The path can be absolute or relative to `process.cwd()`. By default, stylelint looks for `.stylelintignore` in `process.cwd()`. See [Configuration](configuration.md#stylelintignore).

## Usage examples

We recommend you lint your CSS before applying any transformations. You can do this by either:

-   creating a separate lint task that is independent of your build one.
-   using the [`plugins` option](https://github.com/postcss/postcss-import#plugins) of [`postcss-import`](https://github.com/postcss/postcss-import) or [`postcss-easy-import`](https://github.com/TrySound/postcss-easy-import) to lint your files before any transformations.
-   placing stylelint at the beginning of your plugin pipeline.

You'll also need to use a reporter. *The stylelint plugin registers warnings via PostCSS*. Therefore, you'll want to use it with a PostCSS runner that prints warnings or another PostCSS plugin whose purpose is to format and print warnings (e.g. [`postcss-reporter`](https://github.com/postcss/postcss-reporter)).

### Example A

A separate lint task that uses the plugin via the PostCSS JS API to lint Less using [`postcss-less`](https://github.com/shellscape/postcss-less).

*Note: the stylelint PostCSS plugin, unlike the stylelint CLI and node API, doesn't have a `syntax` option. Instead, the syntax must be set within the [PostCSS options](https://github.com/postcss/postcss#options) as there can only be one parser/syntax in a pipeline.*

```js
var fs = require("fs")
var less = require("postcss-less")
var postcss = require("postcss")

// CSS to be processed
var css = fs.readFileSync("input.css", "utf8")

postcss([
  require("stylelint")({ /* your options */ }),
  require("postcss-reporter")({ clearReportedMessages: true })
])
  .process(css, {
    from: "input.css",
    syntax: less
  })
  .then()
  .catch(err => console.error(err.stack))
```

The same pattern can be used to lint SCSS or [SugarSS](https://github.com/postcss/sugarss) syntax.

### Example B

A combined lint and build task where the plugin is used via the PostCSS JS API, but within [`postcss-import`](https://github.com/postcss/postcss-import) (using the its `plugins` option) so that the source files are linted before any transformations.

```js
var fs = require("fs")
var postcss = require("postcss")
var stylelint = require("stylelint")

// CSS to be processed
var css = fs.readFileSync("lib/app.css", "utf8")

postcss(
  [
    require("postcss-import")({
      plugins: [
        require("stylelint")({ /* your options */ })
      ]
    }),
    require("postcss-cssnext"),
    require("postcss-reporter")({ clearReportedMessages: true })
  ]
)
  .process(css, { from: 'lib/app.css', to: 'app.css' })
  .then(function (result) {
    fs.writeFileSync('app.css', result.css);
    if ( result.map ) fs.writeFileSync('app.css.map', result.map);
  })
  .catch(err => console.error(err.stack))
```
