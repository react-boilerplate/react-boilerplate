'use strict';
var path = require('path');
var webpack = require('webpack');

var commonLoaders = [
  {test: /.*\.(gif|png|jpe?g|svg|bmp|webp)$/i, loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]',
    '../index.js']},
];
var assetsPath = path.join(__dirname, 'public/assets');

module.exports = [
  {
    entry: './test/app.js',
    output: {
      path: assetsPath,
      filename: 'app.[hash].js'
    },
    module: {
      loaders: commonLoaders
    },
    imageWebpackLoader: {
      mozjpeg: {
        quality: 65
      },
      pngquant:{
        quality: "65-90",
        speed: 4
      },
      svgo:{
        plugins: [
          {
            removeViewBox: false
          },
          {
            removeEmptyAttrs: false
          }
        ]
      },
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7,
        interlaced: false
      },
      webp: {
        quality: 75
      }
    }
  }
];
