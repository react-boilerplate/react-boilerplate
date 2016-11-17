/* eslint-disable strict,global-require,no-console */

'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const appPort = require('./port');
const port = exports.port = appPort + 1;
const chalk = require('chalk');

const debug = console.log.bind(console, chalk.cyan('[ssr service]'));

function ensureAllGeneratedFilesExist() {
  const filenames = [
    path.join(__dirname, 'middlewares', 'generated.assets.json'),
    path.join(__dirname, 'middlewares', 'generated.serverSideRenderAppToStringAtLocation'),
  ];

  let filename;
  try {
    for (filename of filenames) {
      require(filename);
    }
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      debug(chalk.gray(`...waiting for '${filename}'`));
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
  app.use(handleSSR);

  http.createServer(app).listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      debug(chalk.gray(`ready @ http://localhost:${port}`));
    }
  });
}
