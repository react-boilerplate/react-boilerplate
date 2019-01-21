# is-supported-regexp-flag [![Build Status](https://travis-ci.org/sindresorhus/is-supported-regexp-flag.svg?branch=master)](https://travis-ci.org/sindresorhus/is-supported-regexp-flag)

> Check whether a RegExp flag is supported. Mostly useful for `y` and `u`.


## Install

```sh
$ npm install --save is-supported-regexp-flag
```


## Usage

```js
var isSupportedRegexpFlag = require('is-supported-regexp-flag');

isSupportedRegexpFlag('g'); // as in /foo/g
//=> true

isSupportedRegexpFlag('u');
//=> false
```

RegExp throws if you're trying to use unsupported flags. This is a nicer way to check for support.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
