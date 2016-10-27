const browserSync = require('browser-sync');
const path = require('path');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

const logger = require('../../server/logger');

module.exports = function startBrowserSync(port, middleware, cb) {
  const bsConfig = {
    proxy: {
      target: `localhost:${port}`,
      middleware,
    },
    port: parseInt(port, 10) + 1,
    ui: {
      port: parseInt(port, 10) + 2,
    },
    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'build/*.css',
    ],
  };
  if (process.env.ENABLE_TUNNEL) {
    bsConfig.tunnel = pkg.name.replace(/\W/g,'');
  }
  const bs = browserSync.create();

  bs.init(bsConfig, (err, bs) => {
    if (err) return cb(err);
    logger.browserSyncStarted();

    // return the BrowserSync URLs, in case someone cares
    cb(null, bs.getOption("urls"));
  });
};
