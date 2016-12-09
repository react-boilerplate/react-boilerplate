/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const fs = require('fs');

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
const socketEnabled = argv.socketEnabled || process.env.SOCKET_ENABLED || false;
const socketPath = argv.socketPath || process.env.SOCKET_PATH || '/tmp/node.sock';
const socketOrPort = socketEnabled ? socketPath : port;

if (socketEnabled) {
  if (fs.existsSync(socketOrPort)) {
    fs.unlinkSync(socketOrPort);
  }
}

// Start your app.
app.listen(socketOrPort, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(socketOrPort, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(socketOrPort, url);
    });
  } else {
    logger.appStarted(socketOrPort);
  }
});
