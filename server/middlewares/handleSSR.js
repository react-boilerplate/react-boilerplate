/* eslint-disable global-require */
require('isomorphic-fetch');

const assets = require('./generated.assets.json'); // eslint-disable-line import/no-unresolved

const serverEntry = require('./generated.serverEntry'); // eslint-disable-line import/no-unresolved
const renderAppToStringAtLocation = serverEntry.renderAppToStringAtLocation;
const appLocales = serverEntry.appLocales;

function extractWebpackDllNamesFromPackage() {
  if (process.env.NODE_ENV === 'production') return [];

  const dllPlugin = require('./dllPlugin');
  return dllPlugin.dlls ? Object.keys(dllPlugin.dlls) : ['reactBoilerplateDeps'];
}

function printError(e) {
  console.error((e.stack && e.stack) || e); // eslint-disable-line no-console
}

module.exports = function handleSSR(req, res) {
  const options = {
    assets,
    webpackDllNames: extractWebpackDllNamesFromPackage(),
    lang: req.acceptsLanguages(appLocales),
  };

  renderAppToStringAtLocation(req.url, options, (response) => {
    if (response.error) {
      res.status(500).send(response.error.message);
      printError(response.error);
    } else if (response.redirectLocation) {
      res.redirect(302, response.redirectLocation);
    } else if (response.notFound) {
      res.status(404).send(response.html);
    } else {
      res.status(200).send(response.html);
    }
  });
};
