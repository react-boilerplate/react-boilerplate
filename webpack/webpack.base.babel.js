/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const AppCachePlugin = require('appcache-webpack-plugin');

module.exports = (options) => {
  options.plugins.push(new AppCachePlugin({ // AppCache should be loaded in both environments
    exclude: ['.htaccess'] // No need to cache .htaccess. See http://mxs.is/googmp
  }));

  return {
    entry: options.entry,
    output: { // Compile into js/build.js
      path: path.resolve(__dirname, '..', 'build'),
      filename: 'js/bundle.js'
    },
    module: {
      loaders: [{
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel',
        exclude: path.join(__dirname, '..', '/node_modules/'),
        query: options.query,
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
    plugins: options.plugins,
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
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true
  };
};
