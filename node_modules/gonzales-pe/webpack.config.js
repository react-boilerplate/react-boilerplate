module.exports = {
  entry: {
    gonzales: './src/gonzales'
  },
  output: {
    filename: 'gonzales.js',
    library: 'gonzales',
    libraryTarget: 'umd',
    path: __dirname + '/lib'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['add-module-exports'],
          presets: [
            ["es2015", { "loose": true }]
          ]
        }
      }
    ]
  }
};
