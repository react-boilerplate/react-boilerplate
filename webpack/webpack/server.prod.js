/* eslint no-console:0 */
// Gets called when running npm run serve

const config = require('./webpack.prod.babel');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const ngrok = require('ngrok');

const historyApi = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(config);
const port = 3000;

console.log(
  chalk.bold('Options:\n') +
  chalk.gray('-----------------------------------\n') +
  chalk.cyan('Source: ') + path.join(__dirname, '../..', 'app') + '\n' +
  chalk.gray('-----------------------------------\n')
);
console.log('Starting server from build folder...');

app.use(historyApi({
  verbose: false
}));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  filename: config.output.filename,
  contentBase: config.output.path,
  lazy: true,
  historyApiFallback: true,
  quiet: true // Without logging
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(chalk.red('ERROR\n' + err));
  } else {
    console.log('Server started ' + chalk.green('✓'));
    ngrok.connect(3000, (innerErr, url) => {
      if (innerErr) {
        console.log(chalk.red('ERROR\n' + innerErr));
      }
      console.log('Tunnel initialised ' + chalk.green('✓'));
      console.log('\nYour app is available at ' + chalk.magenta(url));
      console.log(chalk.blue('\nPress ' + chalk.italic('CTRL-C') + ' to stop'));
    });
  }
});
