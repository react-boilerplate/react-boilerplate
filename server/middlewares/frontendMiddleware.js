const express = require('express');
const path = require('path');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

// Dev middleware
const addDevMiddlewares = (app, options) => {
  const compiler = webpack(options);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: options.output.publicPath,
    silent: true,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'));
    res.send(file.toString());
  });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(options.output.publicPath, express.static(options.output.path));

  app.get('*', (req, res) => res.sendFile(path.join(options.output.path, 'index.html')));
};

/**
 * Front-end middleware
 */
module.exports = (options) => {
  const isProd = process.env.NODE_ENV === 'production';

  const app = express();

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    addDevMiddlewares(app, options);
  }

  return app;
};
