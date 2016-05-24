const webpackConfig = require('../webpack/webpack.test.babel');
const path = require('path');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    reporters: ['coverage', 'mocha'],
    /*eslint-disable */
    browsers: process.env.TRAVIS
      ? ['ChromeTravis']
      : process.env.APPVEYOR
        ? ['IE'] : ['Chrome'],
    /*eslint-enable */

    autoWatch: false,
    singleRun: true,

    files: [
      {
        pattern: './test-bundler.js',
        watched: false,
        served: true,
        included: true,
      },
    ],

    preprocessors: {
      ['./test-bundler.js']: ['webpack', 'sourcemap'], // eslint-disable-line  no-useless-computed-key
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true,
    },

    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    coverageReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reporters: [
        { type: 'lcov', subdir: 'lcov' },
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
      ],
    },

  });
};
