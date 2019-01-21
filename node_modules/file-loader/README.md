<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]

# file-loader

A file loader module for webpack

## Requirements

This module requires a minimum of Node v6.9.0 and works with Webpack v3 and Webpack v4.

## Getting Started

To begin, you'll need to install `file-loader`:

```console
$ npm install file-loader --save-dev
```

Import (or `require`) the target file(s) in one of the bundle's files:

```js
// bundle file
import img from './file.png'
```

Then add the loader to your `webpack` config. For example:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
}
```

And run `webpack` via your preferred method. This will emit `file.png` as a file
in the output directory (with the specified naming convention, if options are
specified to do so) and returns the public URI of the file.

_Note: By default the filename of the resulting file is the MD5 hash of the
file's contents with the original extension of the required resource._

## Options

### `context`

Type: `String`
Default: [`context`](https://webpack.js.org/configuration/entry-context/#context)

Specifies a custom file context.

```js
// webpack.config.js
...
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    context: ''
  }
}
...
```

### `emitFile`

Type: `Boolean`
Default: `true`

If true, emits a file (writes a file to the filesystem). If false, the loader
will return a public URI but _will not_ emit the file. It is often useful to
disable this option for server-side packages.

```js
// bundle file
import img from './file.png'
```

```js
// webpack.config.js
...
{
  loader: 'file-loader',
  options: {
    emitFile: false
  }
}
...
```

### `name`

Type: `String|Function`
Default: `'[hash].[ext]'`

Specifies a custom filename template for the target file(s) using the query
parameter `name`. For example, to copy a file from your `context` directory into
the output directory retaining the full directory structure, you might use:

```js
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }
}
```

Or using a `Function`:

```js
// webpack.config.js
...
{
  loader: 'file-loader',
  options: {
    name (file) {
      if (env === 'development') {
        return '[path][name].[ext]'
      }

      return '[hash].[ext]'
    }
  }
}
...
```

_Note: By default the path and name you specify will output the file in that
same directory, and will also use the same URI path to access the file._

### `outputPath`

Type: `String|Function`
Default: `undefined`

Specify a filesystem path where the target file(s) will be placed.

```js
// webpack.config.js
...
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    outputPath: 'images/'
  }
}
...
```

### `publicPath`

Type: `String|Function`
Default: [`__webpack_public_path__`](https://webpack.js.org/api/module-variables/#__webpack_public_path__-webpack-specific-)

Specifies a custom public path for the target file(s).

```js
// webpack.config.js
...
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    publicPath: 'assets/'
  }
}
...
```

### `regExp`

Type: `RegExp`
Default: `undefined`

Specifies a Regular Expression to one or many parts of the target file path.
The capture groups can be reused in the `name` property using `[N]`
[placeholder](https://github.com/webpack-contrib/file-loader#placeholders).

```js
import img from './customer01/file.png'
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/,
    name: '[1]-[name].[ext]'
  }
}
```

_Note: If `[0]` is used, it will be replaced by the entire tested string,
whereas `[1]` will contain the first capturing parenthesis of your regex and so
on..._

### `useRelativePath`

Type: `Boolean`
Default: `false`

Specifies whether or not to generate a relative URI for each target file context.

```js
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    useRelativePath: process.env.NODE_ENV === "production"
  }
}
```

## Placeholders

### `[ext]`

Type: `String`
Default: `file.extname`

The file extension of the target file/resource.

### `[hash]`

Type: `String`
Default: `'md5'`

Specifies the hash method to use for hashing the file content. See
[Hashes](https://github.com/webpack-contrib/file-loader#hashes).

### `[N]`

Type: `String`
Default: `undefined`

The n-th match obtained from matching the current file name against the regExp

### `[name]`

Type: `String`
Default: `file.basename`

The basename of the file/resource.

### `[path]`

Type: `String`
Default: `file.dirname`

The path of the resource relative to the webpack/config context.

## Hashes

Custom hashes can be used by specifying a hash with the following format:
 `[<hashType>:hash:<digestType>:<length>]`.

### `digestType`

Type: `String`
Default: `'hex'`

The [digest](https://en.wikipedia.org/wiki/Cryptographic_hash_function) that the
hash function should use. Valid values include: base26, base32, base36,
base49, base52, base58, base62, base64, and hex.

### `hashType`

Type: `String`
Default: `'md5'`

The type of hash that the has function should use. Valid values include: md5,
sha1, sha256, and sha512.

### `length`

Type: `Number`
Default: `9999`

Users may also specify a length for the computed hash.

## Examples

The following examples show how one might use `file-loader` and what the result
would be.

```js
// bundle file
import png from 'image.png'
```

```js
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    name: 'dirname/[hash].[ext]'
  }
}
```

```bash
# result
dirname/0dcbbaa701328ae351f.png
```

---

```js
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    name: '[sha512:hash:base64:7].[ext]'
  }
}
```

```bash
# result
gdyb21L.png
```

---

```js
// bundle file
import png from 'path/to/file.png'
```

```js
// webpack.config.js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]?[hash]'
  }
}
```

```bash
# result
path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

#### [MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/file-loader.svg
[npm-url]: https://npmjs.com/package/file-loader

[node]: https://img.shields.io/node/v/file-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/file-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/file-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/file-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/file-loader

[cover]: https://codecov.io/gh/webpack-contrib/file-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/file-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
