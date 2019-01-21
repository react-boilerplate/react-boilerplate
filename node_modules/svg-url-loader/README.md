# svg-url-loader
[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![Dependencies][deps-image]][deps-url] [![Dev. Dependencies][dev-deps-image]][dev-deps-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

A webpack loader which loads SVG file as utf-8 encoded DataUrl string.

Existing [`url-loader`](https://github.com/webpack-contrib/url-loader) always does Base64 encoding for data-uri.  As SVG content is a human-readable xml string, using base64 encoding is not mandatory.  Instead, one may only escape [unsafe characters](http://www.ietf.org/rfc/rfc1738.txt) and replace `"` with `'` as described [in this article](http://codepen.io/Tigt/post/optimizing-svgs-in-data-uris).

There are some benefits for choosing utf-8 encoding over base64.
1. Resulting string is shorter (can be ~2 times shorter for 2K-sized icons);
2. Resulting string will be compressed better when using gzip compression;
3. Browser parses utf-8 encoded string faster than its base64 equivalent.

## Supported parameters

Parameters can be passed both in a url or from webpack config file. See [Loaders](https://webpack.js.org/concepts/loaders/) section in webpack documentation for more details.

The loader supports the following parameters:

### `noquotes`

Passing this parameter (or setting to `true`) tells to loader *not to include* resulting string in quotes. This can be useful if one wants to use data-url for SVG image as a value for JavaScript variable.


### `limit`

If given will tell the loader not to encode the source file if its content is greater than this limit.
Defaults to no limit.
If the file is greater than the limit the [`file-loader`](https://github.com/webpack-contrib/file-loader) is used and all query parameters are passed to it.

``` javascript
require('svg-url-loader?limit=1024!./file.svg');
// => DataUrl if "file.png" is smaller that 1kb

require('svg-url-loader?prefix=img/!./file.svg');
// => Parameters for the file-loader are valid too
//    They are passed to the file-loader if used.
```

### `stripdeclarations`

If given will tell the loader to strip out any XML declaration, e.g. `<?xml version="1.0" encoding="UTF-8"?>` at the beginning of imported SVGs.
Internet Explorer (tested in Edge 14) cannot handle XML declarations in CSS data URLs (`content: url("data:image/svg...")`).

``` javascript
require('svg-url-loader?stripdeclarations!./file.svg');
```

### `iesafe`

This option falls back to the file-loader if the file contains a style-element and the encoded size is above 4kB no matter the `limit` specified.

Internet Explorer (including IE11) stops parsing style-elements in SVG data-URIs longer than 4kB. This results in black fill-color for all styled shapes.

``` javascript
require('svg-url-loader?iesafe!./file.svg');
```

### `encoding`

This option controls which encoding to use when constructing a data-URI for an SVG. When set to a non-"none" value, quotes are never applied to the outputted data-URI. 

Possible values are "base64" and "none". Defaults to "none".

``` javascript
require('svg-url-loader?encoding=base64!./file.svg');
```

## Usage

[Documentation: Loaders](https://webpack.js.org/concepts/loaders/)

### In JS:
``` javascript
require('svg-url-loader!./file.svg');
// => DataUrl for file.svg, enclosed in quotes

require('svg-url-loader?noquotes!./file.svg');
// => DataUrl for file.svg, without quotes
```

### In CSS (with webpack.config.js below):
``` css
.icon {
    background: url('../images/file.svg');
}
```
``` javascript
module.exports = {
  //...
	module: {
		rules: [
			{
			    test: /\.svg/,
			    use: {
			        loader: 'svg-url-loader',
			        options: {}
			    }
			}
		]
	},
	//...
};
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[deps-image]: https://img.shields.io/david/bhovhannes/svg-url-loader.svg
[deps-url]: https://david-dm.org/bhovhannes/svg-url-loader

[dev-deps-image]: https://img.shields.io/david/dev/bhovhannes/svg-url-loader.svg
[dev-deps-url]: https://david-dm.org/bhovhannes/svg-url-loader#info=devDependencies

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://www.npmjs.org/package/svg-url-loader
[npm-version-image]: https://img.shields.io/npm/v/svg-url-loader.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/svg-url-loader.svg?style=flat

[travis-url]: https://travis-ci.org/bhovhannes/svg-url-loader
[travis-image]: https://img.shields.io/travis/bhovhannes/svg-url-loader.svg?style=flat
