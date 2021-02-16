const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const memfs = require('memfs');
const mkdirp = require('mkdirp');

// add required methods to memfs
// see https://github.com/webpack/webpack-dev-middleware#outputfilesystem
memfs.join = path.join;
memfs.mkdirp = mkdirp;


function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    publicPath,
    stats: 'errors-only',
    outputFileSystem: memfs
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => {
    // Since webpackDevMiddleware uses memfs internally to store build
    // artifacts, we use it here
    memfs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
