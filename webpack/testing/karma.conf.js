const webpackConfig = require('../webpack/webpack.test.babel');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    reporters: ['coverage', 'mocha'],
    browsers: process.env.TRAVIS
      ? ['ChromeTravis']
      : ['Chrome'],

    autoWatch: false,
    singleRun: true,

    files: [
      {
        pattern: './test-bundler.js',
        watched: false,
        served: true,
        included: true
      }
    ],

    preprocessors: {
      ['./test-bundler.js']: ['webpack', 'sourcemap']
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
    },

    coverageReporter: {
      dir: '../../coverage',
      reporters: [
        { type: 'lcov', subdir: 'lcov' },
        { type: 'html', subdir: 'html' }
      ]
    },

  });
};
