/* eslint no-console:0 */
// Gets called when running npm start

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');
const ip = require('ip');

console.log('Source: ' + path.join(__dirname, '..', 'app'));
console.log('Destination: ' + config.output.path);
console.log('Hot reloading: enabled');
console.log('Starting server...\n');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true // Without logging
}).listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started');
    console.log('Listening at localhost:3000 or http://' + ip.address() +
      ':3000 for access from other devices in your local network!');
    console.log('Press CTRL-C to stop');
  }
});
