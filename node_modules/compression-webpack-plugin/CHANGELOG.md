# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0"></a>
## [2.0.0](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.12...v2.0.0) (2018-09-04)

### Features

* `filename` option now accept `{String}` value
* validation schema for plugin options

### BREAKING CHANGES

* enforces `peerDependencies` of `"webpack": "^4.3.0"`
* enforces `engines` of `"node": ">= 6.9.0 <7.0.0 || >= 8.9.0`
* compressed options (`options.level`, `options.flush`, `options.dictionary` and etc) grouped into `compressionOptions` option
* `asset` option was removed (use `filename` option instead)
* default value of `filename` option is now `[path].gz[query]`



<a name="1.1.12"></a>
## [1.1.12](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.11...v1.1.12) (2018-08-29)

### Bug Fixes

* correct handling filename with `query` ([#105](https://github.com/webpack-contrib/compression-webpack-plugin/issues/105)) ([c8d7757](https://github.com/webpack-contrib/compression-webpack-plugin/commit/c8d7757))



<a name="1.1.11"></a>
## [1.1.11](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.10...v1.1.11) (2018-03-09)


### Performance Improvements

* **index:** switch to `md4` for content hashing ([#103](https://github.com/webpack-contrib/compression-webpack-plugin/issues/103)) ([0eebc46](https://github.com/webpack-contrib/compression-webpack-plugin/commit/0eebc46))



<a name="1.1.10"></a>
## [1.1.10](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.9...v1.1.10) (2018-02-27)


### Performance Improvements

* use `neo-async` instead `async` ([#98](https://github.com/webpack-contrib/compression-webpack-plugin/issues/98)) ([1cd3095](https://github.com/webpack-contrib/compression-webpack-plugin/commit/1cd3095))



<a name="1.1.9"></a>
## [1.1.9](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.8...v1.1.9) (2018-02-26)


### Bug Fixes

* **package:** add `webpack >= 4` (`peerDependencies`) ([#101](https://github.com/webpack-contrib/compression-webpack-plugin/issues/101)) ([d3c29e7](https://github.com/webpack-contrib/compression-webpack-plugin/commit/d3c29e7))



<a name="1.1.8"></a>
## [1.1.8](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.7...v1.1.8) (2018-02-23)


### Bug Fixes

* **index:** `tapable` deprecation warnings (`webpack >= v4.0.0`) ([#100](https://github.com/webpack-contrib/compression-webpack-plugin/issues/100)) ([d6ccdc4](https://github.com/webpack-contrib/compression-webpack-plugin/commit/d6ccdc4))



<a name="1.1.7"></a>
## [1.1.7](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.6...v1.1.7) (2018-02-16)


### Bug Fixes

* **index:** reduce memory usage (`cacheKey.hash`) ([#97](https://github.com/webpack-contrib/compression-webpack-plugin/issues/97)) ([3c77d43](https://github.com/webpack-contrib/compression-webpack-plugin/commit/3c77d43))



<a name="1.1.6"></a>
## [1.1.6](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.5...v1.1.6) (2018-01-29)



<a name="1.1.5"></a>
## [1.1.5](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.4...v1.1.5) (2018-01-29)


### Bug Fixes

* **package:** use `prepare` instead of `prepublish` for release ([0b90a71](https://github.com/webpack-contrib/compression-webpack-plugin/commit/0b90a71))



<a name="1.1.4"></a>
## [1.1.4](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.3...v1.1.4) (2018-01-29)


### Bug Fixes

* missing options `include` and `exclude` ([#95](https://github.com/webpack-contrib/compression-webpack-plugin/issues/95)) ([cc44bcb](https://github.com/webpack-contrib/compression-webpack-plugin/commit/cc44bcb))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.2...v1.1.3) (2017-12-22)


### Bug Fixes

* `cache` behaviour ([#91](https://github.com/webpack-contrib/compression-webpack-plugin/issues/91)) ([9791044](https://github.com/webpack-contrib/compression-webpack-plugin/commit/9791044))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.1...v1.1.2) (2017-12-14)


### Bug Fixes

* `text/include/exclude` option behaviour ([#88](https://github.com/webpack-contrib/compression-webpack-plugin/issues/88)) ([1d0a840](https://github.com/webpack-contrib/compression-webpack-plugin/commit/1d0a840))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.1.0...v1.1.1) (2017-12-14)


### Bug Fixes

* **index:** don't use `JSON.stringify()` to serialize the `cache` data (`options.cache`) ([#87](https://github.com/webpack-contrib/compression-webpack-plugin/issues/87)) ([0d22741](https://github.com/webpack-contrib/compression-webpack-plugin/commit/0d22741))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.0.1...v1.1.0) (2017-12-14)


### Features

* add `cache` option (`options.cache`) ([#86](https://github.com/webpack-contrib/compression-webpack-plugin/issues/86)) ([49a8a77](https://github.com/webpack-contrib/compression-webpack-plugin/commit/49a8a77))
* add `include` and `exclude` options (`options.include|options.exclude`) ([#82](https://github.com/webpack-contrib/compression-webpack-plugin/issues/82)) ([1ce3024](https://github.com/webpack-contrib/compression-webpack-plugin/commit/1ce3024))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.0.0...v1.0.1) (2017-09-29)


### Code Refactoring

* Use emit event instead of this-compilation ([#71](https://github.com/webpack-contrib/compression-webpack-plugin/pull/71)) ([9ebc852](https://github.com/webpack-contrib/compression-webpack-plugin/commit/9ebc852))


<a name="1.0.0"></a>
# [1.0.0](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.0.0-beta.1...v1.0.0) (2017-07-15)

### Code Refactoring

* apply webpack-defaults ([#54](https://github.com/webpack-contrib/compression-webpack-plugin/issues/54)) ([f6f8c6c](https://github.com/webpack-contrib/compression-webpack-plugin/commit/f6f8c6c))


### BREAKING CHANGES

* Enforces `peerDependencies` of `"webpack": ">= 3.0.0-rc.0 || ^3.0.0"`.
* Enforces `engines` of `"node": ">=4.3.0 < 5.0.0 || >= 5.10`
* Remove loose dependency on Node Zopfli, which has been extracted to it's own plugin https://github.com/webpack-contrib/zopfli-webpack-plugin

Migration:

- `npm i -D zopfli-webpack-plugin`
- The Zopfli API has remained the same, those who were using the Zopfli option in this plugin should just need to switch plugins.


<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2017-07-03)


### Code Refactoring

* Drops optional Zopfli dependency ([#65](https://github.com/webpack-contrib/compression-webpack-plugin/issues/65)) ([328048a](https://github.com/webpack-contrib/compression-webpack-plugin/commit/328048a))


### BREAKING CHANGES

* The optional dependency for Zopfli was causing issues in consumers CI / CD chains, this option has now been removed.

MIGRATION: Zopfli is now in it's own plugin the options have remained the same. For those using the Zopfli option in `compression-webpack-plugin` swap it out for `https://github.com/webpack-contrib/zopfli-webpack-plugin`



<a name="1.0.0-beta.0"></a>
# [1.0.0-beta.0](https://github.com/webpack-contrib/compression-webpack-plugin/compare/v0.4.0...v1.0.0-beta.0) (2017-06-24)


### Code Refactoring

* apply webpack-defaults ([#54](https://github.com/webpack-contrib/compression-webpack-plugin/issues/54)) ([f6f8c6c](https://github.com/webpack-contrib/compression-webpack-plugin/commit/f6f8c6c))


### BREAKING CHANGES

* Enforces `peerDependencies` of `"webpack": ">= 3.0.0-rc.0 || ^3.0.0"`.
* Enforces `engines` of `"node": ">=4.3.0 < 5.0.0 || >= 5.10`
* Remove loose dependency on Node Zopfli, which has been extracted to it's own plugin https://github.com/webpack-contrib/zopfli-webpack-plugin

Migration:

- `npm i -D zopfli-webpack-plugin`
- The Zopfli API has remained the same, those who were using the Zopfli option in this plugin should just need to switch plugins.



<a name="0.4.0"></a>
# [0.4.0](https://github.com/webpack/compression-webpack-plugin/compare/v0.3.2...v0.4.0) (2017-04-08)


### Features

* add option to change the filename ([#51](https://github.com/webpack/compression-webpack-plugin/issues/51)) ([fb7bd81](https://github.com/webpack/compression-webpack-plugin/commit/fb7bd81))
* add option to delete original assets ([#44](https://github.com/webpack/compression-webpack-plugin/issues/44)) ([24f15f2](https://github.com/webpack/compression-webpack-plugin/commit/24f15f2))



<a name="0.3.2"></a>
## 0.3.2 (2016-09-13)


### Chores

* Update node-zopfli version ([2d3dd44](https://github.com/webpack-contrib/compression-webpack-plugin/commit/2d3dd44))


<a name="0.3.1"></a>
## 0.3.1 (2016-03-26)


### Bug Fixes

* TypeError Invalid non-strig/buffer chunk ([53ec8a9](https://github.com/webpack/compression-webpack-plugin/commit/53ec8a9))

<a name="0.3.0"></a>
## 0.3.0 (2016-01-23)


### Bug Fixes

* Correct zopfli options ([1f3b595](https://github.com/webpack/compression-webpack-plugin/commit/1f3b595))
* plugin options syntax ([437bdff](https://github.com/webpack/compression-webpack-plugin/commit/437bdff))

### Features

* Add compression level option ([9d05172](https://github.com/webpack/compression-webpack-plugin/commit/9d05172))
* Add node-zopfli option ([2c22b1c](https://github.com/webpack/compression-webpack-plugin/commit/2c22b1c))
* Permit {path} and {query} in asset name ([12d167c](https://github.com/webpack/compression-webpack-plugin/commit/12d167c))

<a name="0.2.0"></a>
## 0.2.0 (2015-04-08)


### Features

* use webpack RawSource ([3c85a2b](https://github.com/webpack/compression-webpack-plugin/commit/3c85a2b))


<a name="0.1.2"></a>
## 0.1.2 (2015-04-08)


### Bug Fixes

* Double compression on worker-loader bundles ([7ce2b32](https://github.com/webpack/compression-webpack-plugin/commit/7ce2b32))
* Remove unneeded module.exports ([6f4e60d](https://github.com/webpack/compression-webpack-plugin/commit/6f4e60d))
