const webpackConfig = require('./webpack.test.babel');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    reporters: ['mocha'],

    browsers: process.env.TRAVIS
      ? ['ChromeTravis']
      : ['Chrome'],

    autoWatch: false,
    singleRun: true,

    files: [
      '../app/**/*.test.js'
    ],

    preprocessors: {
      ['../app/**/*.test.js']: ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true
    },

    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
