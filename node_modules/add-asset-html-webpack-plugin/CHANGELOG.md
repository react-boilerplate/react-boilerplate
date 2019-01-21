# Change Log

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/).

Latest version of this document will always be available on
https://github.com/SimenB/add-asset-html-webpack-plugin/releases

## [Unreleased]

## [2.1.3] - 2018-03-03

### Fixes

* Webpack 4 compatibility

### Changed

* Replace Bluebird with `p-each-series`
* Replace `minimatch` with `micromatch`

## [2.1.2] - 2017-09-15

### Fixes

* Fix TypeScript definition file
  * Allows an array of options in the plugin constructor
  * Added `files` property to options

## [2.1.1] - 2017-08-16

### Fixes

* Fix typo in readme (`filter` -> `files`)

## [2.1.0] - 2017-08-07

### Added

* Support globby string as filepath option (#78, thanks @Genuifx and @NumerHero)

## [2.0.1] - 2017-04-23

### Fixes

* Support only string as option to files

## [2.0.0] - 2017-04-23

### Breaking

* Drop support for `node<4`

### Added

* Add `files` option
  * Allows you to only include a given asset in certain html files
  * Ported from https://npm.im/html-webpack-include-assets-plugin

## [1.0.2] - 2016-08-07

### Fixes

* Fix TypeScript definition file (#22, thanks @hh10k)

## [1.0.1] - 2016-08-06

### Fixes

* Make `require` work without `.default` again (Fixes #20)

## [1.0.0] - 2016-07-29

### Breaking

* Rename `filname` to `filepath`, which makes much more sense

### Added

* A Changelog!
* A first attempt to add typings
* Tests for 100% coverage (#17)
* `outputPath` option (#16, thanks @wadahiro)

### Fixes

* Fix wrong documentation

### Internal

* Centralise linting

## [0.4.0] - 2016-07-21

### Added

* `publicPath` option (#9, thanks @wadahiro)

### Internal

* Lint the code on travis

## [0.3.0] - 2016-07-15

### Added

* Add `hash` option to append a hash to the filename (#8, thanks @wadahiro)

### Changed

* Added a note in the readme regarding what version of `html-webpack-plugin` is
  needed

### Internal

* Use AirBnB ESLint config instead of Standard

## [0.2.0] - 2016-05-30

### Added

* Allow passing an array of files to the plugin (#6)

## [0.1.0] - 2016-05-28

### Changed

* Pass `htmlPluginData` to the callback (#5, thanks @RyanEwen)

## [0.0.3] - 2016-03-17

### Changed

* Use `html-webpack-plugin-before-html-generation` as the event from
  `html-webpack-plugin`

## [0.0.2] - 2016-02-27

### Added

* A Changelog!
* Use `publicPath` from webpack config if available

#### Internal

* Fix URL to repo in package.json

## [0.0.1] - 2016-02-27

Initial release

[unreleased]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v2.1.3...HEAD
[2.1.3]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v2.1.2...v2.1.3
[2.1.2]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v0.0.3...v0.1.0
[0.0.3]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/SimenB/add-asset-html-webpack-plugin/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/SimenB/add-asset-html-webpack-plugin/commit/02e262d47b56934b714f71d92b557ba3204eae22
