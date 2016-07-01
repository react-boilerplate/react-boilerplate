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
const host = argv.host || process.env.HOST || 'localhost';

let server;

const listen = () => {
  // Start your app.
  server = app.listen(port, host, (err) => {
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
};

module.exports = listen;

if (require.main === module && !server) { listen(); }

/* eslint-disable */
if (module.hot) {
  const checkForUpdate = () => {
    module.hot.check(function (err, updatedModules) {
      console.log('Check For Update', err, updatedModules)
      if (err) {
        if (module.hot.status() in {
          abort: 1,
          fail: 1,
        }) {
          console.warn('[HMR] Cannot apply update.');
          console.warn('[HMR] ' + err.stack || err.message);
          console.warn('[HMR] You need to restart the application!');
        } else {
          console.warn('[HMR] Update failed: ' + err.stack || err.message);
        }
        return;
      }
      if (!updatedModules) {
        return;
      }

      module.hot.apply({
        ignoreUnaccepted: true,
      }, function (err, renewedModules) {
        if (err) {
          if (module.hot.status() in {
            abort: 1,
            fail: 1,
          }) {
            console.warn('[HMR] Cannot apply update (Need to do a full reload!)');
            console.warn('[HMR] ' + err.stack || err.message);
            console.warn('[HMR] You need to restart the application!');
          } else {
            console.warn('[HMR] Update failed: ' + err.stack || err.message);
          }
          return;
        }

        console.log('Applying updates', renewedModules)
        checkForUpdate(true);
      });
    });
  };

  process.on('SIGUSR2', function () {
    if (module.hot.status() !== 'idle') {
      //console.warn('[HMR] Got signal but currently in ' + module.hot.status() + ' state.');
      //console.warn('[HMR] Need to be in idle state to start hot update.');
      return;
    }
    checkForUpdate();
  });
} else {
  console.log('[HMR] Disabled')
}


// I don't understand how else to prevent process from exiting.
// If it exits, it will get restarted by nodemon, but then hot reloading won't work.
setInterval(() => {}, 1000);
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception in runner process', err.code)
})
/* eslint-enable */
