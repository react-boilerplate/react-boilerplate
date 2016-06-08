/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
<<<<<<< 84591d9edf0e1be29ca35609445744c03e88c37e
const ngrok = isDev && process.env.USE_TUNNEL ? require('ngrok') : false;
=======
const ngrok = isDev ? require('ngrok') : false;
>>>>>>> Fix style mistakes
const resolve = require('path').resolve;

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.use(
 frontend({
   outputPath: resolve(process.cwd(), 'build'),
   publicPath: '/',
 })
);

const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
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
