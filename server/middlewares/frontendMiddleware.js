const express = require('express');
const path = require('path');
const readFile = require('fs').readFileSync;
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

  // Using the default DLL Plugin config, there is only one bundle to serve
  if (!dllPlugin.dlls) {
    app.get('/react-boilerplate-dependencies.js', (req, res) => {
      const file = readFile(path.join(process.cwd(), 'app/dlls/react-boilerplate-dependencies.js'));
      res.send(file.toString());
    });
  } else if (typeof dllPlugin.dlls === 'object') {
    Object.keys(dllPlugin).forEach((dllName) => {
      app.get(`/${dllName}.js`, (req, res) => {
        const file = readFile(path.join(process.cwd(), `app/dlls/${dllName}.js`));
        res.send(file.toString());
      });
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
