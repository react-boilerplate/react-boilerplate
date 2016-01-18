/* eslint no-console:0 */
// Gets called when running npm start

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.babel');
const ip = require('ip');
const chalk = require('chalk');

console.log(
  chalk.bold('Options:') +
  chalk.gray('\n-----------------------------------') +
  chalk.cyan('\n       Source: ') + path.join(__dirname, '..', 'app') +
  chalk.cyan('\nHot reloading: ') + chalk.green('Enabled') +
  chalk.gray('\n-----------------------------------')
);
console.log('\nStarting server...');

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
    console.log(
      chalk.bold('\nAccess URLs:') +
      chalk.gray('\n-----------------------------------') +
      '\n   Local: ' + chalk.magenta('http://localhost:3000') +
      '\nExternal: ' + chalk.magenta('http://' + ip.address() + ':3000') +
      chalk.gray('\n-----------------------------------')
    );
    console.log(chalk.blue('\nPress ' + chalk.italic('CTRL-C') + ' to stop'));
  }
});
