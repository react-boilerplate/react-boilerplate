/* eslint no-console:0 */
// Gets called when running npm run serve

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.prod.babel');
const ngrok = require('ngrok');

console.log('Starting server from build folder...');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  filename: config.output.filename,
  contentBase: config.output.path,
  lazy: true,
  historyApiFallback: true,
  quiet: true // Without logging
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started');
    ngrok.connect(3000, (innerErr, url) => {
      if (innerErr) {
        console.log('ERROR\n' + innerErr);
      }
      console.log('Tunnel initialised');
      console.log('\nYour app is available at ' + url + '!');
    });
  }
});
