/* eslint-disable */

var path = require('path');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = function(options) {
  options.plugins.push(new AppCachePlugin({ // AppCache should be everywhere
    exclude: ['.htaccess'] // No need to cache .htaccess. See http://mxs.is/googmp
  }));

  return {
    entry: options.entry,
    output: { // Compile into js/build.js
      path: path.resolve(__dirname, '..', 'build'),
      filename: "js/bundle.js"
    },
    module: {
      loaders: [{
        test: /\.js$/, // Transform all .js files required somewhere within an entry point...
        loader: 'babel', // ...with the specified loaders...
        exclude: path.join(__dirname, '..', '/node_modules/'), // ...except for the node_modules folder.
        query: options.query,
      }, {
        test: /\.css$/, // Transform all .css files required somewhere within an entry point...
        loader: options.cssLoaders // ...with PostCSS
      }, {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "url-loader?limit=10000"
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }
      ]
    },
    plugins: options.plugins,
    postcss: function() {
      return options.postcssPlugins;
    },
    target: "web", // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true
  };
};
