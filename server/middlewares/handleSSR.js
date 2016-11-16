/* eslint-disable global-require */
require('isomorphic-fetch');

const serverSideRenderAppToStringAtLocation = require('./serverSideRenderAppToStringAtLocation.generated');

function extractWebpackDllNamesFromPackage() {
  if (process.env.NODE_ENV === 'production') return [];

  const dllPlugin = require('./dllPlugin');
  return dllPlugin.dlls ? Object.keys(dllPlugin.dlls) : ['reactBoilerplateDeps'];
}

module.exports = function handleSSR(req, res) {
  const options = {
    webpackDllNames: extractWebpackDllNamesFromPackage(),
  };

  serverSideRenderAppToStringAtLocation(req.url, options, (error, redirectLocation, html) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (html) {
      res.status(200).send(html);
    } else {
      res.status(404).send('not found');
    }
  });
};
