/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const browserSync = require('../internals/scripts/browserSync');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
const middleware = setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Configure browserSync in dev mode
  if (process.env.NODE_ENV !== 'production') {
    browserSync(port, middleware, (innerErr) => {
      if (innerErr) {
        return logger.error(innerErr);
      }
      logger.appStarted();
    });
  } else {
    logger.appStarted();
  }
});
