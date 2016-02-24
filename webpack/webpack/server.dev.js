/* eslint no-console:0 */
// Gets called when running npm start

const config = require('./webpack.dev.babel');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const ip = require('ip');

const historyApi = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(config);
const argv = require('minimist')(process.argv.slice(2));
const port = argv.p || 3000;

console.log(
  chalk.bold('Options:') +
  chalk.gray('\n-----------------------------------') +
  chalk.cyan('\n       Source: ') + path.join(__dirname, '../..', 'app') +
  chalk.cyan('\nHot reloading: ') + chalk.green('Enabled') +
  chalk.gray('\n-----------------------------------')
);
console.log('\nStarting server...');

app.use(historyApi({
  verbose: false
}));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true // Without logging
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server started ' + chalk.green('✓'));
  console.log(
    chalk.bold('\nAccess URLs:') +
    chalk.gray('\n-----------------------------------') +
    '\n   Local: ' + chalk.magenta('http://localhost:' + port) +
    '\nExternal: ' + chalk.magenta('http://' + ip.address() + ':' + port) +
    chalk.gray('\n-----------------------------------')
  );
});
