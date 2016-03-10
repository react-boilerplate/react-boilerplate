/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const ngrok = require('ngrok');

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

// If you are developing more than just front-end, like POST form
// handling or API, add your custom middleware here
// app.use('/api', myApi);

// Initialize frontend middleware that will server your JS app
const webpackConfig = isDev
  ? require('../internals/webpack/webpack.dev.babel')
  : require('../internals/webpack/webpack.prod.babel');

app.use(frontend(webpackConfig));

const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.onError(err);
  }

  logger.onAppStarted(port);

  // Connect to ngrok in dev mode
  if (isDev) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.onError(innerErr);
      }

      logger.onTunnelStarted(url);
    });
  }
});
