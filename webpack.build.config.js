var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
  ],
  output: { // ...and compile it into the build folder
    path: path.resolve(__dirname, 'build'),
    filename: "js/bundle.js"
  },
  module: {
    loaders: [{
        test: /\.js$/, // Transform all .js files required somewhere within an entry point...
        loaders: ['react-hot', 'babel'], // ...with babel and react-hot...
        exclude: path.join(__dirname, '/node_modules/') // ...except for the node_modules folder.
      }, {
        test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
        loader: "style-loader!css-loader!postcss-loader" // ...with PostCSS
      }, {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "url-loader?limit=10000"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  postcss: function() {
    return [
      require('postcss-import')(), // Import all the css files...
      require('postcss-simple-vars')(), // ...then replace the variables...
      require('postcss-focus')(), // ...add a :focus to ever :hover...
      require('autoprefixer-core')({ // ...add vendor prefixes...
        browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
      }),
      require('cssnano')({ // ...and minify the result.
        autoprefixer: false, // Don't run autoprefixer since we've already done that...
        comments: {
          removeAll: true // ...and remove all comments, even those marked important.
        }
      }),
      require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
        clearMessages: true
      })
    ];
  },
  plugins: [ // Plugins for Webpack
    new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
      compress: {
        warnings: false // ...but do not show warnings in the console (there is a lot of them)
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html', // Move the index.html file...
      minify: { // Minifying it while it is parsed using the following, self–explanatory options
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new AppCachePlugin({
      cache: ['index.html', 'js/bundle.js', 'serviceworker.js']
    })
  ],
  target: "web", // Make web variables accessible to webpack, e.g. window
}