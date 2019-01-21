# Change Log
All notable changes to this project will be documented in this file.

## [4.2.0]

* Update svgo to 6.0.0 #145

## [4.1.0]

* Delay imports #140

## [4.0.0]

Updated mozjpeg to v7.0.0

## [3.6.0]

Reverted mozjpeg to v6.0.0, same as v3.4.0

## [3.5.0] deprecated!

Updated mozjepg to v7.0.0, but this was a major change and thus reverted it.

## [3.0.0] - 2016-10-16
### Changed
- Changed jpeg compression algorithm from jpegtran to mozjpeg [PR#38](https://github.com/tcoopman/image-webpack-loader/pull/38).
See [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) for configuration options. 
- Updated minor versions of dependencies: `loader-utils`, `imagemin-gifsicle`,  `imagemin-optipng`, `imagemin-svgo`, `webpack`
