const express = require('express');
const http = require('http');
const handleSSR = require('./middlewares/handleSSR');
const appPort = require('./port');

const port = exports.port = appPort + 1;

if (require.main === module) {
  const app = express();
  app.use(handleSSR);

  http.createServer(app).listen(port, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
    } else {
      console.log('devServerRenderService listening on port %s', port);  // eslint-disable-line no-console
    }
  });
}
