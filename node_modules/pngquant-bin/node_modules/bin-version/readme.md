# bin-version [![Build Status](https://travis-ci.com/sindresorhus/bin-version.svg?branch=master)](https://travis-ci.com/sindresorhus/bin-version)

> Get the version of a binary in [semver](https://github.com/npm/node-semver) format


## Install

```
$ npm install bin-version
```


## Usage

```
$ curl --version
curl 7.30.0 (x86_64-apple-darwin13.0)
```

```js
const binVersion = require('bin-version');

(async () => {
	console.log(await binVersion('curl'));
	//=> '7.30.0'
})();
```

```
$ openssl version
OpenSSL 1.0.2d 9 Jul 2015
```

```js
(async () => {
	console.log(await binVersion('openssl', {args: ['version']}));
	//=> '1.0.2'
})();
```


## CLI

See [`find-versions-cli`](https://github.com/sindresorhus/find-versions-cli).


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
