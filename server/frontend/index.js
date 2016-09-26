const express = require('express');
const resolve = require('path').resolve;

const setupMiddleware = require('./middleware');

const app = express();

// In production we need to pass these values in instead of relying on webpack
setupMiddleware(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

module.exports = app;
