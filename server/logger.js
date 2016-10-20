/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (portOrSocket, tunnelStarted) => {
    console.log(`Server started ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    if (typeof (portOrSocket) === 'string') {
      console.log(`
  ${chalk.bold('Server listening on socket:')}${divider}
  Socket: ${chalk.magenta(portOrSocket)}${divider}
  ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
      `);
    } else {
      console.log(`
  ${chalk.bold('Access URLs:')}${divider}
  Localhost: ${chalk.magenta(`http://localhost:${portOrSocket}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${portOrSocket}`) +
  (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
  ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
      `);
    }
  },
};

module.exports = logger;
