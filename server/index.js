/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;
const socket_enabled = argv.socket_enabled || process.env.SOCKET_ENABLED || false
const socket_path = argv.socket_path || process.env.SOCKET_PATH || '/tmp/node.sock'
const socket_or_port = socket_enabled ? socket_path : port;

if (socket_enabled) {
  const fs = require('fs');
  if (fs.existsSync(socket_or_port)) {
    fs.unlinkSync(socket_or_port);
  }
}

// Start your app.
  app.listen(socket_or_port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(socket_or_port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(socket_or_port, url);
    });
  } else {
    logger.appStarted(socket_or_port);
  }
});
