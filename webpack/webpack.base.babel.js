/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = (options) => {
  return {
    entry: options.entry,
    output: { // Compile into js/build.js
      path: path.resolve(__dirname, '..', 'build'),
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/'
    },
    module: {
      loaders: [{
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel',
        exclude: path.join(__dirname, '..', '/node_modules/'),
        query: options.babelQuery,
      }, {
        test: /\.css$/, // Transform all .css files required somewhere with PostCSS
        loader: options.cssLoaders
      }, {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }
      ]
    },
    plugins: options.plugins.concat([
      new webpack.optimize.CommonsChunkPlugin('common.js')
    ]),
    postcss: () => {
      return options.postcssPlugins;
    },
    resolve: {
      modulesDirectories: [
        'assets',
        'containers',
        'components',
        'node_modules'
      ],
      extensions: [
        '',
        '.js',
        '.jsx',
        '.react.js'
      ]
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true
  };
};
