/* eslint-disable strict,global-require,no-console */

'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const appPort = require('./port');
const port = appPort + 1;
const chalk = require('chalk');
const enableDestroy = require('server-destroy');
const addDevMiddlewares = require('./middlewares/addDevMiddlewares');

exports.port = port;

const debug = console.log.bind(console, chalk.cyan('[ssr service]'));

function ensureAllGeneratedFilesExist() {
  const modules = [
    path.join(__dirname, 'middlewares', 'generated.assets.json'),
    path.join(__dirname, 'middlewares', 'generated.serverEntry'),
  ];

  let modulePath;
  try {
    for (modulePath of modules) { // eslint-disable-line no-restricted-syntax
      require(modulePath);
    }
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      debug(chalk.gray(`...waiting for '${modulePath}'`));
      process.exit(1);
    } else {
      throw e;
    }
  }
}

if (require.main === module) {
  ensureAllGeneratedFilesExist();

  const handleSSR = require('./middlewares/handleSSR');

  const app = express();
  // const webpackConfig = require('../internals/webpack/webpack.dev.babel');
  // const addDevMiddlewares = require('./middlewares/addDevMiddlewares');
  // addDevMiddlewares(app, webpackConfig);
  app.use(handleSSR);

  const server = http.createServer(app).listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      debug(chalk.gray('ready!'));
    }
  });

  enableDestroy(server);

  // see: https://github.com/remy/nodemon#controlling-shutdown-of-your-script
  process.once('SIGUSR2', () => {
    server.destroy(() => {
      debug(chalk.gray('restarting...'));
      process.kill(process.pid, 'SIGUSR2');
    });
  });
}
