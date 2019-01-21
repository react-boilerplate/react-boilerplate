# clone-regexp [![Build Status](https://travis-ci.org/sindresorhus/clone-regexp.svg?branch=master)](https://travis-ci.org/sindresorhus/clone-regexp)

> Clone and modify a [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) instance


## Install

```sh
$ npm install --save clone-regexp
```


## Usage

```js
var cloneRegexp = require('clone-regexp');
var re = /[a-z]/gi;

cloneRegexp(re);
//=> /[a-z]/gi

cloneRegexp(re) === re;
//=> false

cloneRegexp(re, {global: false});
//=> /[a-z]/i

cloneRegexp(re, {multiline: true});
//=> /[a-z]/gim

cloneRegexp(re, {source: 'unicorn'});
//=> /unicorn/gi
```


## API

### cloneRegexp(regexp, [options])

#### regex

Type: `regexp`

RegExp instance to clone.


#### options

Type: `object`  
Properties: [`source`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source) [`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global) [`ignoreCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase) [`multiline`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline) [`sticky`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) [`unicode`](http://norbertlindenberg.com/2012/05/ecmascript-supplementary-characters/#RegExp)

Optionally modify the cloned RegExp instance.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
