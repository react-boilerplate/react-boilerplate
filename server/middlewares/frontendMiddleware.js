/* eslint-disable global-require */
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const bookRoutes = require('../routes/books');
const articleRoutes = require('../routes/articles');
const authorRoutes = require('../routes/authors');
const { User } = require('../../db');

if (process.env.NODE_ENV === 'development') require('../../env-secrets');

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: process.env.SESSION_ID,
    resave: false,
    saveUninitialized: true,
    expires: false,
  }));

  app.get('/sw', (req, res) => {
    res.sendFile(path.join(__dirname, '../../sw.js'));
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user = user;
      req.session.save();
      res.status(201).json({ ok: 1 });
    } else {
      res.status(401).json({ ok: 0 });
    }
  });

  app.get('/api/whoami', (req, res) => {
    if (req.session.user) res.json({ ok: 1 });
    else res.json({ ok: 0 });
  });

  app.get('/api/logout', (req, res) => {
    req.session.destroy();
    if (!req.session) res.json({ ok: 1 });
    else res.status(400).json({ ok: 0 });
  });

  app.use((req, res, next) => {
    if (req.method !== 'GET' && !req.session.user) {
      res.sendStatus(401);
    } else {
      next();
    }
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
