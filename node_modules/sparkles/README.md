<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# sparkles

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Travis Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Namespaced global event emitter

## Usage

Sparkles exports a function that returns a singleton `EventEmitter`.
This EE can be shared across your application, whether or not node loads
multiple copies.

```js
var sparkles = require('sparkles')(); // make sure to call the function

sparkles.on('my-event', function(evt){
  console.log('my-event handled', evt);
});

sparkles.emit('my-event', { my: 'event' });
```

## API

### sparkles(namespace)

Returns an EventEmitter that is shared amongst the provided namespace.  If no namespace
is provided, returns a default EventEmitter.

### sparkles.exists(namespace);

Checks whether a namespace exists and returns true or false.

## Why the name?

This is a "global emitter"; shortened: "glitter" but it was already taken; so we got sparkles instead :smile:

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/sparkles.svg
[npm-url]: https://www.npmjs.com/package/sparkles
[npm-image]: http://img.shields.io/npm/v/sparkles.svg

[travis-url]: https://travis-ci.org/gulpjs/sparkles
[travis-image]: http://img.shields.io/travis/gulpjs/sparkles.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/sparkles
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/sparkles.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/sparkles
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/sparkles/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.svg
