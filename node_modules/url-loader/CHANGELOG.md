# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.1"></a>
## [1.0.1](https://github.com/webpack-contrib/url-loader/compare/v1.0.0...v1.0.1) (2018-03-03)


### Bug Fixes

* **index:** revert to CJS exports (`module.exports`) ([#116](https://github.com/webpack-contrib/url-loader/issues/116)) ([7b60cc2](https://github.com/webpack-contrib/url-loader/commit/7b60cc2))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/webpack-contrib/url-loader/compare/v1.0.0-beta.0...v1.0.0) (2018-03-03)


### Bug Fixes

* **index:** use `Buffer.from` instead of deprecated `new Buffer` ([#113](https://github.com/webpack-contrib/url-loader/issues/113)) ([457618b](https://github.com/webpack-contrib/url-loader/commit/457618b))



<a name="1.0.0-beta.0"></a>
# [1.0.0-beta.0](https://github.com/webpack-contrib/url-loader/compare/v0.6.2...v1.0.0-beta.0) (2017-12-17)


### Code Refactoring

* apply `webpack-defaults` ([#102](https://github.com/webpack-contrib/url-loader/issues/102)) ([073b588](https://github.com/webpack-contrib/url-loader/commit/073b588))


### BREAKING CHANGES

* Sets `engines` to `"node": ">= 6.9.0 || >= 8.9.0"`
* Drops support for `webpack =< v2.0.0`



<a name="0.6.2"></a>
## [0.6.2](https://github.com/webpack-contrib/url-loader/compare/v0.6.1...v0.6.2) (2017-10-04)


### Bug Fixes

* allow use `limit` as string ([#96](https://github.com/webpack-contrib/url-loader/issues/96)) ([b31684d](https://github.com/webpack-contrib/url-loader/commit/b31684d))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/webpack-contrib/url-loader/compare/v0.6.0...v0.6.1) (2017-10-04)


### Bug Fixes

* **schema:** allow `additionalProperties` ([#94](https://github.com/webpack-contrib/url-loader/issues/94)) ([2b01ea2](https://github.com/webpack-contrib/url-loader/commit/2b01ea2))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/webpack-contrib/url-loader/compare/v0.5.9...v0.6.0) (2017-10-03)


### Features

* **index:** add options validation (`schema-utils`) ([#78](https://github.com/webpack-contrib/url-loader/issues/78)) ([ced5990](https://github.com/webpack-contrib/url-loader/commit/ced5990))
* add `fallback` option ([#88](https://github.com/webpack-contrib/url-loader/issues/88)) ([636ebed](https://github.com/webpack-contrib/url-loader/commit/636ebed))

### Security

* Updates Mime pacakge due to Regex DOS security vulnerability ([#87](https://github.com/webpack-contrib/url-loader/issues/87)) ([d19ee2d](https://github.com/webpack-contrib/url-loader/commit/d19ee2d))

 - Reference issue https://nodesecurity.io/advisories/535


<a name="0.5.9"></a>
## [0.5.9](https://github.com/webpack/url-loader/compare/v0.5.8...v0.5.9) (2017-06-12)


### Bug Fixes

* `String` not being `base64` encoded ([#67](https://github.com/webpack/url-loader/issues/67)) ([e9496b9](https://github.com/webpack/url-loader/commit/e9496b9))
* don't default to `0` (`options.limit`) ([#74](https://github.com/webpack/url-loader/issues/74)) ([020c2a8](https://github.com/webpack/url-loader/commit/020c2a8))



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
