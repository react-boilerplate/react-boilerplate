# Font Face Observer [![Build Status](https://travis-ci.org/bramstein/fontfaceobserver.png?branch=master)](https://travis-ci.org/bramstein/fontfaceobserver)

Font Face Observer is a small `@font-face` loader and monitor (3.5KB minified and 1.3KB gzipped) compatible with any web font service. It will monitor when a web font is applied to the page and notify you. It does not limit you in any way in where, when, or how you load your web fonts. Unlike the [Web Font Loader](https://github.com/typekit/webfontloader) Font Face Observer uses scroll events to detect font loads efficiently and with minimum overhead.

## How to use

Include your `@font-face` rules as usual. Fonts can be supplied by either a font service such as [Google Fonts](http://www.google.com/fonts), [Typekit](http://typekit.com), and [Webtype](http://webtype.com) or be self-hosted. It doesn't matter where, when, or how you load your fonts. You can set up monitoring for a single font family at a time:

```js
var font = new FontFaceObserver('My Family', {
  weight: 400
});

font.load().then(function () {
  console.log('Font is available');
}, function () {
  console.log('Font is not available');
});
```

The `FontFaceObserver` constructor takes two arguments: the font family name (required) and an object describing the variation (optional). The object can contain `weight`, `style`, and `stretch` properties. If a property is not present it will default to `normal`. To start observing font loads, call the `load` method. It'll immediately return a new Promise that resolves when the font is available and rejected when the font is not available.

If your font doesn't contain latin characters you can pass a custom test string to the `load` method.

```js
var font = new FontFaceObserver('My Family');

font.load('中国').then(function () {
  console.log('Font is available');
}, function () {
  console.log('Font is not available');
});
```

The default timeout for giving up on font loading is 3 seconds. You can increase or decrease this by passing a number of milliseconds as the second parameter to the `load` method.

```js
var font = new FontFaceObserver('My Family');

font.load(null, 5000).then(function () {
  console.log('Font is available');
}, function () {
  console.log('Font is not available after waiting 5 seconds');
});
```

Multiple fonts can be loaded by creating a FontFaceObserver instance for each.

```js
var fontA = new FontFaceObserver('Family A');
var fontB = new FontFaceObserver('Family B');

fontA.load().then(function () {
  console.log('Family A is available');
});

fontB.load().then(function () {
  console.log('Family B is available');
});
```

You may also load both at the same time, rather than loading each individually.

```js
var fontA = new FontFaceObserver('Family A');
var fontB = new FontFaceObserver('Family B');

Promise.all([fontA.load(), fontB.load()]).then(function () {
  console.log('Family A & B have loaded');
});
```

The following example emulates FOUT with Font Face Observer for "My Family".

```js
var font = new FontFaceObserver('My Family');

font.load().then(function () {
  document.documentElement.className += " fonts-loaded";
});
```

```css
.fonts-loaded {
  body {
    font-family: My Family, sans-serif;
  }
}
```

## Installation

If you're using npm you can install Font Face Observer as a dependency:

```shell
$ npm install fontfaceobserver
```

You can then require `fontfaceobserver` as a CommonJS (Browserify) module:

```js
var FontFaceObserver = require('fontfaceobserver');

var font = new FontFaceObserver('My Family');

font.load().then(function () {
  console.log('My Family has loaded');
});
```

If you're not using npm, grab `fontfaceobserver.js` or `fontfaceobserver.standalone.js` (see below) and include it in your project. It'll export a global `FontFaceObserver` that you can use to create new instances.

Font Face Observer uses Promises in its API, so for [browsers that do not support promises](http://caniuse.com/#search=promise) you'll need to include a polyfill. If you use your own Promise polyfill you just need to include `fontfaceobserver.standalone.js` in your project. If you do not have an existing Promise polyfill you should use `fontfaceobserver.js` which includes a small Promise polyfill. Using the Promise polyfill adds roughly 1.4KB (500 bytes gzipped) to the file size.

## Browser support

FontFaceObserver has been tested and works on the following browsers:

* Chrome (desktop & Android)
* Firefox
* Opera
* Safari (desktop & iOS)
* IE8+
* Android WebKit

## License

Font Face Observer is licensed under the BSD License. Copyright 2014-2016 Bram Stein. All rights reserved.
