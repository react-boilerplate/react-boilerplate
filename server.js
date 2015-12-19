// Gets called when running npm start

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

console.log('Starting server...\n');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true // Without logging
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started');
    console.log('Listening at localhost:3000');
  }
});
