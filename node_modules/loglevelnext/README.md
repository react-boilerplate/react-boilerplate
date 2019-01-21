
<div align="center">
  <img width="150" height="150" src="http://shellscape.org/assets/images/external/loglevelnext-icon.svg">
</div>
&nbsp;  

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![devdeps][devdeps]][devdeps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]

# loglevelnext

`loglevelnext` is a modern logging library for Node.js and modern browsers,
written with modern patterns and practices which provides log level mapping of the
`console` object.

## Getting Started

First thing's first, install the module:

```console
npm install loglevelnext --save
```

## Usage

Users can choose to use `loglevelnext` in Node.js or in the client (browser).

```js
// Node.js
const log = require('loglevelnext');

log.info('bananas!');
```

```html
<!-- browser -->
<!doctype>
<html>
  <head>
    <script src="/path/to/loglevelnext.js"></script>
  </head>
  <body>
    <script>
      window.log.info('zomg');
    </script>
  </body>
</html>

```

## Log Levels

By default `loglevelnext` ships supporting the following log level name-value
pairs:

```js
{
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}
```

## Default Logger

When requiring `loglevelnext` in Node.js the default export will be an instance
of [`LogLevel`](docs/LogLevel.md) wrapped with some extra sugar.

When loading the `loglevelnext.js` script in the client (browser), the script
will assign `window.log` to an instance of [`LogLevel`](docs/LogLevel.md),
wrapped with that same extra sugar.

### Methods

Please see [`LogLevel`](docs/LogLevel.md) for documentation of all methods and
properties of every log instance, including the default instance.

#### `trace`, `debug`, `info`, `warn`, `error`

These methods correspond to the available log levels and accept parameters
identical to their `console` counterparts. eg.

```js
console.info('...');
console.info('...');
// ... etc
```

#### `getLogger(options)`

Returns a new `LogLevel` instance. The `options` parameter should be an `Object`
matching the options for the [`LogLevel`](docs/LogLevel.md) constructor.

_Note: the logger returned is cached, and subsequent requests for a logger of
the same name will return the same logger instance. If you require multiple
unique loggers of the same name, pass an `id` property with a unique identifier
and `getLogger` will use that over the `name`._

#### `noConflict()`

When using `loglevelnext` in a browser environment, you may encounter a scenario
in which `window.log` is already assigned when the script loads, resulting in
`window.log` being reassigned to `loglevelnext`. This method will restore
`window.log` to it's original value and return the default logger.

### Properties

#### `factories`

Type: `Array [ Class ]`

Gets an `Array` containing the factory classes available within `loglevelnext`
to outside modules. Particularily useful when creating plugins. eg.

```js
const log = require('loglevelnext');
const { MethodFactory } = log.factories;
class MyFactory extends MethodFactory { ... }
```

#### `loggers`

Type: `Array [ LogLevel ]`

Gets an `Array` containing references to the currently instantiated loggers.

## Factories aka Plugins

If you're used to using plugins with `loglevel`, fear not. The same capabilities
are available in `loglevelnext`, but in a much more straightforward and structured
way. `loglevelnext` supports by way of "Factories." A `Factory` is nothing more
than a class which defines several base methods that operate on the `console`
and provide functionality to a `LogLevel` instance. All factories must inherit from the
[`MethodFactory`][methodFactory] class, and may override any defined class functions.

For an example factory, please have a look at the [`PrefixFactory`][prefixFactory]
which provides similar functionality as the [loglevel-prefix](loglevelpre) plugin,
and is the factory which is used when a user passes the `prefix` option to a
`LogLevel` instance.

## Persisting the Level

Persisting the level of a log between sessions in a browser isn't the job of a
logging library. Primarily because working with `localStorage` these days is a
breeze. If you need to store and retrieve a log level value between sessions,
please look into leveraging the excellent and very tiny [`store2`](https://github.com/nbubna/store)
library.

## Browser Support

As mentioned, `loglevelnext` is a logging library for Node.js and _modern_
browsers, which means the latest versions of the major browsers. Unfortunately
"oldIE" versions aren't officially supported. The minimum Internet Exploder
version supported is IE10, though [Microsoft no longer supports it][oldie].

If you're in need of support for old or outdated browser versions, please use
the older [loglevel][loglevel], which supports browsers as old as IE6.

_Note: This library's distribution file is compiled in a way that will
technically work all the way back to IE8 - as that version and above support
`localStorage`. However, IE8 and IE9 require that the developer tools be open
prior to invoking this library._

## Contributing

We welcome your contributions! Please have a read of [CONTRIBUTING.md](CONTRIBUTING.md) for more information on how to get involved.

## Attribution

_This project is a fork of the much-loved [loglevel](loglevel) module._

Base Log SVG by [Freepik](http://www.freepik.com/) from [www.flaticon.com](http://www.flaticon.com).

## License

#### [MIT](./LICENSE)


[npm]: https://img.shields.io/npm/v/loglevelnext.svg
[npm-url]: https://npmjs.com/package/loglevelnext

[node]: https://img.shields.io/node/v/loglevelnext.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/shellscape/loglevelnext.svg
[deps-url]: https://david-dm.org/shellscape/loglevelnext

[devdeps]: https://david-dm.org/shellscape/loglevelnext/dev-status.svg
[devdeps-url]: https://david-dm.org/shellscape/loglevelnext

[tests]: http://img.shields.io/travis/shellscape/loglevelnext.svg
[tests-url]: https://travis-ci.org/shellscape/loglevelnext

[cover]: https://codecov.io/gh/shellscape/loglevelnext/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/shellscape/loglevelnext

[loglevel]: https://githhub.com/pimterry/loglevel
[loglevelpre]: https://github.com/kutuluk/loglevel-plugin-prefix
[oldie]: https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support
[methodFactory]: lib/MethodFactory.js
[prefixFactory]: factory/PrefixFactory.js
