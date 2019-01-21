# pngquant-bin [![Build Status](https://travis-ci.org/imagemin/pngquant-bin.svg?branch=master)](https://travis-ci.org/imagemin/pngquant-bin)

> [`pngquant`](https://github.com/pornel/pngquant) is a PNG compressor that significantly reduces file sizes by converting images to a more efficient 8-bit PNG format

You probably want [`imagemin-pngquant`](https://github.com/imagemin/imagemin-pngquant) instead.


## Install

```
$ npm install pngquant-bin
```


## Usage

```js
const execFile = require('child_process').execFile;
const pngquant = require('pngquant-bin');

execFile(pngquant, ['-o', 'output.png', 'input.png'], err => {
	console.log('Image minified!');
});
```


## CLI

```
$ npm install --global pngquant-bin
```

```
$ pngquant --help
```


## License

MIT © [Imagemin](https://github.com/imagemin)
