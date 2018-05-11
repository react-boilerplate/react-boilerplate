/* eslint-disable global-require */
const bodyParser = require('body-parser');
const path = require('path');

const bookRoutes = require('../routes/books');
const articleRoutes = require('../routes/articles');
const authorRoutes = require('../routes/authors');

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/sw', (req, res) => {
    res.sendFile(path.join(__dirname, '../../sw.js'));
  });

  app.use('/api/books', bookRoutes);
  app.use('/api/articles', articleRoutes);
  app.use('/api/authors', authorRoutes);

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
