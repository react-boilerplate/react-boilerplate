const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const httpProxy = require('http-proxy');

const dllPlugin = require('./dllPlugin');
const renderServiceProxyPort = require('../devRenderService').port;

const renderServiceUrl = `http://localhost:${renderServiceProxyPort}`;

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

function dllPluginsMiddleware(req, res) {
  const filename = req.path.replace(/^\//, '');
  res.sendFile(path.join(process.cwd(), dllPlugin.path, filename));
}

function createServerRenderProxyMiddleware(serviceUrl) {
  const renderProxy = httpProxy.createProxyServer({});

  return function serverRenderMiddleware(req, res) {
    renderProxy.web(req, res, { target: serviceUrl }, (error) => {
      console.error(error); // eslint-disable-line no-console
      res.status(500).send(`
        Proxying failed for page rendering service.\n
        The service maybe restarting so try again in a second.\n
        Check the console for more information.
      `);
    });
  };
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);

  app.use(createWebpackMiddleware(compiler, webpackConfig.output.publicPath));
  app.use(webpackHotMiddleware(compiler));

  if (dllPlugin) {
    app.get(/\.dll\.js$/, dllPluginsMiddleware);
  }

  app.use(createServerRenderProxyMiddleware(renderServiceUrl));
};
