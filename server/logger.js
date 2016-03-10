const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
module.exports = {

  // Called whenever there's an error on the server we want to print
  onError: err => {
    console.log(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  onAppStarted: port => {
    console.log('Server started ' + chalk.green('✓'));
    console.log(
      chalk.bold('\nAccess URLs:') +
      divider +
      '\n   Local: ' + chalk.magenta('http://localhost:' + port) +
      '\nExternal: ' + chalk.magenta('http://' + ip.address() + ':' + port) +
      divider,
      chalk.blue('\nPress ' + chalk.italic('CTRL-C') + ' to stop\n')
    );
  },

  // Called when ngrok tunnel is initialized
  onTunnelStarted: (url) => {
    console.log('Tunnel initialised ' + chalk.green('✓'));
    console.log(
      chalk.bold('\nAccess URLs:') +
      divider +
      '\n   Proxy: ' + chalk.magenta(url) +
      divider + `\n`
    );
  },

};
