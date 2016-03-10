const express = require('express');
const path = require('path');

// Dev middleware
const addDevMiddlewares = (app, options) => {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');

  const compiler = webpack(options);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: options.output.publicPath,
    lazy: true,
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

const addProdMiddlewares = (app, options) => {
  const compression = require('compression');

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
