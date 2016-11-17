/* eslint-disable global-require */
require('isomorphic-fetch');

const serverSideRenderAppToStringAtLocation = require('./serverSideRenderAppToStringAtLocation.generated'); // eslint-disable-line import/no-unresolved
const assets = require('./assets.generated.json'); // eslint-disable-line import/no-unresolved

function extractWebpackDllNamesFromPackage() {
  if (process.env.NODE_ENV === 'production') return [];

  const dllPlugin = require('./dllPlugin');
  return dllPlugin.dlls ? Object.keys(dllPlugin.dlls) : ['reactBoilerplateDeps'];
}

module.exports = function handleSSR(req, res) {
  const options = {
    assets,
    webpackDllNames: extractWebpackDllNamesFromPackage(),
  };

  serverSideRenderAppToStringAtLocation(req.url, options, (response) => {
    if (response.error) {
      res.status(500).send(response.error.message);
    } else if (response.redirectLocation) {
      res.redirect(302, response.redirectLocation);
    } else if (response.notFound) {
      res.status(404).send(response.html);
    } else {
      res.status(200).send(response.html);
    }
  });
};
