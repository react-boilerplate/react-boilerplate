/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const ngrok = require('ngrok');
const resolve = require('path').resolve;

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const pkg = require(resolve(process.cwd(), 'package.json'));

// Initialize frontend middleware that will serve your JS app
const webpackConfig = isDev ?
  require('../internals/webpack/webpack.dev.babel') :
  require('../internals/webpack/webpack.prod.babel');

const webpackMiddlewares = frontend(webpackConfig, { dllPlugin: pkg.dllPlugin });

app.use(webpackMiddlewares);

const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err);
  }

  // Connect to ngrok in dev mode
  if (isDev) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
