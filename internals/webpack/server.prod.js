/* eslint no-console:0 */
// Gets called when running npm run serve

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.prod.babel');
const ngrok = require('ngrok');
const chalk = require('chalk');

console.log(
  chalk.bold('Options:\n') +
  chalk.gray('-----------------------------------\n') +
  chalk.cyan('Source: ') + path.join(__dirname, '../..', 'app') + '\n' +
  chalk.gray('-----------------------------------\n')
);
console.log('Starting server from build folder...');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  filename: config.output.filename,
  contentBase: config.output.path,
  lazy: true,
  historyApiFallback: true,
  quiet: true, // Without logging
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
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
