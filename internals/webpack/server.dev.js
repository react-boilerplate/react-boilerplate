/* eslint no-console:0 */

// Gets called when running npm start

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.babel');
const ip = require('ip');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const port = argv.p || 3000;

console.log(
  chalk.bold('Options:') +
  chalk.gray('\n-----------------------------------') +
  chalk.cyan('\n       Source: ') + path.join(process.cwd(), 'app') +
  chalk.cyan('\nHot reloading: ') + chalk.green('Enabled') +
  chalk.gray('\n-----------------------------------')
);
console.log('\nStarting server...');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true, // Without logging
}).listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started ' + chalk.green('✓'));
    console.log(
      chalk.bold('\nAccess URLs:') +
      chalk.gray('\n-----------------------------------') +
      '\n   Local: ' + chalk.magenta('http://localhost:' + port) +
      '\nExternal: ' + chalk.magenta('http://' + ip.address() + ':' + port) +
      chalk.gray('\n-----------------------------------')
    );
    console.log(chalk.blue('\nPress ' + chalk.italic('CTRL-C') + ' to stop'));
  }
});
