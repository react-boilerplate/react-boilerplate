/* eslint-disable no-console */

const chalk = require('chalk');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: () => {
    console.log(`Server started ${chalk.green('✓')}`);
  },

  // Called when BrowserSync starts w/o errors
  browserSyncStarted: () => {
    console.log(`BrowserSync started ${chalk.green('✓')}`);
  },
};

module.exports = logger;
