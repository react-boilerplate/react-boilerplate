/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const sagaGenerator = require('./saga/index.js');
const routeGenerator = require('./route/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('saga', sagaGenerator);
  plop.setGenerator('route', routeGenerator);
};
