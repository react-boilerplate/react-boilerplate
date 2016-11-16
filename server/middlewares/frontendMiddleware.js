/* eslint-disable global-require */
const path = require('path');

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const renderServiceProxyPort = require('../devRenderService').port;
  const httpProxy = require('http-proxy');
  const proxy = httpProxy.createProxyServer({});
  const dllPlugin = require('./dllPlugin');

  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  if (dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '');
      res.sendFile(path.join(process.cwd(), dllPlugin.path, filename));
    });
  }

  const renderServiceUrl = `http://localhost:${renderServiceProxyPort}`;
  app.use((req, res) => {
    proxy.web(req, res, { target: renderServiceUrl }, (error) => {
      console.error(error); // eslint-disable-line no-console
      res.status(500).send('Proxying failed for page rendering service');
    });
  });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const express = require('express');
  const compression = require('compression');
  const handleSSR = require('./handleSSR');

  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('*', handleSSR);
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
