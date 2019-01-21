# execall [![Build Status](https://travis-ci.org/sindresorhus/execall.svg?branch=master)](https://travis-ci.org/sindresorhus/execall)

> Find multiple RegExp matches in a string

Instead of having to iterate over `RegExp#exec`, immutable, and with a nicer result format.


## Install

```
$ npm install --save execall
```


## Usage

```js
var execall = require('execall');

execall(/(\d+)/g, '$200 and $400');
/*
[
	{
		match: '200',
		sub: ['200'],
		index: 1
	},
	{
		match: '400',
		sub: ['400'],
		index: 10
	}
]
*/
```


## API

### execall(re, input)

Returns an array of objects with a match, sub-matches, and index.

#### re

Type: `regexp`

Regular expression to match against the `input`.

#### input

Type: `string`


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
