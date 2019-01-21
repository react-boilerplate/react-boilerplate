var webpack = require('webpack')

var config = {
  entry: './src/index',
  module: {
    rules: [
      { test: /\.js$/, use: [ 'babel-loader' ], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'ConnectedReactRouter',
    libraryTarget: 'umd'
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ]
}

module.exports = config
