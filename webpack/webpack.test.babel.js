/**
 * TEST WEBPACK CONFIGURATION
 */

module.exports = {
  devtool: 'inline-source-map',
  module: {
    // Some libraries don't like being run through babel.
    // If they gripe, put them here.
    noParse: [
      /node_modules\/sinon/,
      /node_modules\/acorn/,
    ],
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'null-loader' },
      { test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/],
        query: {
          plugins: ['babel-plugin-rewire']
        }
      },
    ]
  },
  // Some node_modules pull in Node-specific dependencies.
  // Since we're running in a browser we have to stub them out. See:
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  // https://github.com/webpack/jade-loader/issues/8#issuecomment-55568520
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // required for enzyme to work properly
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  },
  resolve: {
    alias: {
      // required for enzyme to work properly
      sinon: 'sinon/pkg/sinon'
    },
  }
};
