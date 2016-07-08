/* eslint-disable */

'use strict';

const webpack = require('webpack');
const webpackConfig = require('../internals/webpack/webpack.server.babel');
const nodemon = require('nodemon');
const path = require('path');

let running = false;

webpack(webpackConfig).watch(250, (err) => {
  if (err) { throw err; }

  try {
    if (!running) {
      running = true;

      console.log('Starting Server in HMR Mode: ' + process.pid);

      nodemon({
        execMap: {
          js: 'node',
        },
        script: path.join(process.cwd(), 'lib', 'server.js'),
        ignore: ['*'],
        watch: [
          path.join(process.cwd(), 'server'),
          path.join(process.cwd(), 'internals'),
        ],
        ext: 'noop',
      });
    }
    // There's a trick here. Restart will just send SIGUSR2 to our process.
    // src/signal.js will intercept it and handle hot update instead of restarting.
    nodemon.restart();

    process.on('uncaughtException', (err) => {
      nodemon.reset()

      if (err.code === 'EIO') {
        process.exit(0);
      }

    })

  } catch (error) {
    console.log('Error', error)
  }
});
