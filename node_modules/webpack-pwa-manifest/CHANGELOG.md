## 3.6.0 (2018-02-27)

- Added Webpack 4 support.

## 3.5.0 (2018-02-13)

- Added filename template. Thanks to @kevinchappell ! See more information at [pull request #34](https://github.com/arthurbergmz/webpack-pwa-manifest/pull/34).
- Added SVG support. Thanks to @acostalima ! See more information at [pull request #49](https://github.com/arthurbergmz/webpack-pwa-manifest/pull/49).
- Fixed recursive filename. Thanks to @satazor ! See more information at [pull request #50](https://github.com/arthurbergmz/webpack-pwa-manifest/pull/50).

## 3.4.1 (2017-12-22)

- Fixed file convention. See more information at [pull request #31](https://github.com/arthurbergmz/webpack-pwa-manifest/pull/31).

## 3.4.0 (2017-12-22)

- Added `includeDirectory`. See more information at this [issue #30](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/30) and this [pull request #29](https://github.com/arthurbergmz/webpack-pwa-manifest/pull/29).

## 3.3.1/3.3.2 (2017-09-18)

- Fixed URI generation. See more information at [issue #23](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/23).

## 3.3.0 (2017-09-12)

- Added 'publicPath' option. See more information at [issue #20](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/20).

## 3.2.0 (2017-08-18)

- Added Apple's Web Application injection. See more information at [issue #13](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/13);
- Added `theme-color` injection. See more information at [issue #18](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/18);
- Added `ios` property into options.
- Added `ios` property into icon options.
- See README.md for detailed information about the new `ios` property.

## 3.1.6 (2017-07-28)

- Fixed misbehavior with protocols' slashes. See more information at [issue #16](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/16).

## 3.1.5 (2017-07-19)

- Fixed excessive "forward" slashes and backslashes. See more information at [issue #15](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/15).

## 3.1.4 (2017-07-19)

- Fixed excessive slashes on output. See more information at [issue #15](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/15).

## 3.1.2 (2017-07-13)

- Fixed resources URI on Windows. See more information at [issue #14](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/14).

## 3.1.1 (2017-07-12)

- `useWebpackPublicPath` is now deprecated. See more information at [issue #12](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/12).

## 3.1.0 (2017-07-03)

- Added `useWebpackPublicPath` into options;
- Removed _HtmlWebpackPlugin_ technical dependency (misbehavior).

## 3.0.0 (2017-06-13)

- Refactored code; **(ES6+ ready)**
- Added HTML injection support through [_HtmlWebpackPlugin_](https://github.com/jantimon/html-webpack-plugin);
- Added file fingerprinting;
- Faster hot reload support.