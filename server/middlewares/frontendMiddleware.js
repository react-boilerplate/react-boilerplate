const express = require('express');
const path = require('path');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

// Dev middleware
const addDevMiddlewares = (app, webpackConfig, options) => {
  const dllPlugin = options.dllPlugin || {};
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (dllPlugin.dlls === 'package.json') {
    app.get('/react-boilerplate-dependencies.js', (req, res) => {
      const file = require('fs').readFileSync(path.join(process.cwd(), 'app/dlls/react-boilerplate-dependencies.js')); // eslint-disable-line global-require
      res.send(file.toString());
    });
  }

  app.get('*', (req, res) => {
    const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'));
    res.send(file.toString());
  });
};

// Production middlewares
const addProdMiddlewares = (app, webpackConfig) => {
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(webpackConfig.output.publicPath, express.static(webpackConfig.output.path));

  app.get('*', (req, res) => res.sendFile(path.join(webpackConfig.output.path, 'index.html')));
};

/**
 * Front-end middleware
 */
module.exports = (webpackConfig, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  const app = express();

  if (isProd) {
    addProdMiddlewares(app, webpackConfig, options || {});
  } else {
    addDevMiddlewares(app, webpackConfig, options || {});
  }

  return app;
};
