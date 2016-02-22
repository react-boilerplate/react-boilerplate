const componentGenerator = require('./component.generator');
const containerGenerator = require('./container.generator');
const selectorGenerator = require('./selector.generator');
const sagaGenerator = require('./saga.generator');
const routeGenerator = require('./route.generator');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('selector', selectorGenerator);
  plop.setGenerator('saga', sagaGenerator);
  plop.setGenerator('route', routeGenerator);
};
