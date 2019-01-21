# postcss-reporter
[![Build Status](https://travis-ci.org/postcss/postcss-reporter.svg?branch=master)](https://travis-ci.org/postcss/postcss-reporter)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/davidtheclark/postcss-reporter/master.svg?label=windows%20build)](https://ci.appveyor.com/project/davidtheclark/postcss-reporter)

A PostCSS plugin to `console.log()` the messages (warnings, etc.) registered by other PostCSS plugins.

## Purpose

As of PostCSS 4.1, a single PostCSS process can accumulate messages from all of the plugins it uses.
Most of these messages are [warnings](https://github.com/postcss/postcss/blob/master/docs/guidelines/plugin.md#32-use-resultwarn-for-warnings).
Presumably, plugin authors want you to see those messages.
So this plugin exists to read the accumulated messages (or messages from only the plugins you've specified), format them, and print them to the console.

By default, the messages are formatted for human legibility and sorted according to the line/column positions attached to the messages. But another formatting function can be passed in with an option, and sorting can be turned of with an option.

*By default, only warnings are logged*. If you would like to see more messages, you can change the `filter` function.

## Example Output

![Example](example.png?raw=true)

## Installation

```
npm install postcss-reporter
```

Version 1.0.0+ is compatible with PostCSS 5+. (Earlier versions are compatible with PostCSS 4.)

## Usage

Add it to your plugin list *after any plugins whose messages you want to log*, and optionally pass it an object of options.

For example, using [gulp-postcss](https://github.com/postcss/gulp-postcss):

```js
gulp.task('css', function() {
  return gulp.src('./src/*.css')
    .pipe(postcss([
      bemLinter(),
      customProperties(),
      calc(),
      rejectAllColors(),
      reporter(myOptions) // <------ ding
    ]))
    .pipe(gulp.dest('./dist'));
});
```

## Options

**clearReportedMessages** (boolean, default = `false`)

If true, the plugin will clear the result's messages after it logs them. This prevents other plugins, or the whatever runner you use, from logging the same information again and causing confusion.

**formatter** (function, default = the default formatter)

By default, this reporter will format the messages for human legibility in the console.
To use another formatter, pass a function that

  - accepts an object containing a `messages` array and a `source` string
  - returns the string to report

For example, you could write a formatter like this:

```js
reporter({
  formatter: function(input) {
    return input.source + ' produced ' + input.messages.length + ' messages';
  }
})
```

**plugins** (array of strings, default = `[]`)

If `plugins` is empty (as it is by default), the reporter will log messages from every PostCSS plugin.

There are 2 ways to limit output:

- **Whitelist:** Provide an array of the plugins whose messages you would like to show.
  For example, `{ plugins: ['postcss-bem-linter'] }` will only log messages from the `postcss-bem-linter` plugin.
- **Blacklist:** Prefix all plugins in the array with `!` to specify only those plugins whose messages you would like to hide.
  (All other plugins will be shown.)
  For example, `{ plugins: ['!postcss-bem-linter'] }` will never log messages from the `postcss-bem-linter` plugin; but will log messages from every other plugin.

**filter** (function)

Provide a filter function. It receives the message object and returns a truthy or falsy value, indicating whether that particular message should be reported or not.

By default, only messages with `type: "warning"` warnings are logged. (These are the messages produced when the plugin author uses PostCSS's `warn()` function.)

For example, `function(message) { return true }` will only every message, regardless of the plugin or whether it's a warning or not.

**clearAllMessages** (boolean, default = `false`)

If `true`, not pass any messages into other plugins, or the whatever runner you use, for logging.

**throwError** (boolean, default = `false`)

If `true`, after the plugin logs your messages it will throw an error if it found any warnings.

**sortByPosition** (boolean, default = `true`)

If `false`, messages will not be sorted by line/column position.

**positionless** (`"first"|"last"|"any"`, default = `"first"`)

By default, messages without line/column positions will be grouped at the beginning of the output.
To put them at the end, instead, use `"last"`.
To not bother sorting these, use `"any"`.

**noIcon** (boolean, default = `false`)

If `true`, no exclamatory triangle icons will be printed next to warnings.

**noPlugin** (boolean, default = `false`)

If `true`, plugin names will not be printed in brackets after messages.

## How to get output without colors

If you would like no colors in the console output, simply pass `--no-colors` when you invoke whatever command runs this plugin. (This works because of [chalk](https://github.com/sindresorhus/chalk).)

## Standalone formatter

You can also use this module's formatter as a library, with following API:

```js
var formatter = require('postcss-reporter/lib/formatter');
var myFormatter = formatter(myOptions);
// to use defaults, just pass no options: `formatter()`
var warningLog = myFormatter({
  messages: someMessages,
  source: someSource
});
console.log(warningLog);
```

These are the formatter's options:

- sortByPosition (boolean, default = `true`)
- noIcon (boolean, default = `false`) - Do not print any warning exclamatory triangle icons
- noPlugin (boolean, default = `false`) - Do not print plugin names
