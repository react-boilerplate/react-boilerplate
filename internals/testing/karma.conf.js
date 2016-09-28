const webpackConfig = require('../webpack/webpack.test.babel');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

module.exports = (config) => {
  let testBrowser;
  if (process.env.TRAVIS) {
    testBrowser = ['ChromeTravis'];
  } else if (process.env.APPVEYOR) {
    testBrowser = ['IE'];
  } else if (process.env.KARMA_BROWSER) {
    testBrowser = [process.env.KARMA_BROWSER];
  } else {
    testBrowser = ['Chrome'];
  }

  config.set({
    frameworks: ['mocha'],
    reporters: ['coverage', 'mocha'],
    browsers: testBrowser,
    autoWatch: false,
    singleRun: true,

    client: {
      mocha: {
        grep: argv.grep,
      },
    },

    files: [
      {
        pattern: './test-bundler.js',
        watched: false,
        served: true,
        included: true,
      },
    ],

    preprocessors: {
      ['./test-bundler.js']: ['webpack', 'sourcemap'], // eslint-disable-line no-useless-computed-key
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
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
