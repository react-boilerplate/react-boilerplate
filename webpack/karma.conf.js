// Karma configuration

const webpack = require('webpack');
const webpackConfig = require('./webpack.base.babel.js');
const path = require('path');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const cssnano = require('cssnano');

module.exports = function getConfig(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'app/**/*.test.js'
    ],


    // list of files to exclude
    exclude: [
      'node_modules'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.test.js': ['webpack']
    },

    webpack: webpackConfig({
      context: path.join(__dirname, '..'),
      cssLoaders: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader',
      postcssPlugins: [
        postcssFocus(),
        cssnext({
          browsers: ['last 2 versions', 'IE > 10']
        }),
        cssnano({
          autoprefixer: false, // cssnext already runs autoprefixer
          discardUnused: false, // unsafe, see http://mxs.is/googmr
          zindex: false // unsafe, see http://mxs.is/googmq
        }),
        postcssReporter({
          clearMessages: true
        })
      ],
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
      ]
    }),

    webpackMiddleware: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      require('karma-webpack'),
      require('karma-mocha')
    ]
  });
};
