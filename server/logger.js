/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');
const path = require('path');
const { format, createLogger, transports } = require('winston');
const { prettyPrint, timestamp, combine, printf } = format;

/**
 * Here you can define the configuration settings for the Log file.
 * @var
 * @type {{file: {filename: *, handleExceptions: boolean, colorize: boolean, level: string, json: boolean, maxsize: number, maxFiles: number}}}
 */
const options = {
  file: {
    filename: path.join(__dirname, '../log/.keep'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: err => {
    // This allows flexibility when writing your own transports in case you wish to include a default format with your transport.
    // eslint-disable-next-line no-shadow
    const myFormat = printf(
      // eslint-disable-next-line no-shadow
      ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`,
    );
    if (process.env.NODE_ENV !== 'development') {
      createLogger({
        format: combine(timestamp(), prettyPrint(), myFormat),
        transports: [new transports.File(options.file)],
      }).error(err);
    } else {
      console.error(chalk.red(err));
    }
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted) => {
    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
        ${chalk.bold('Access URLs:')}${divider}
        Localhost: ${chalk.magenta(`http://${host}:${port}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
          (tunnelStarted
            ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}`
            : '')}${divider}
        ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
