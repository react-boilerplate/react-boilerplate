/**
 * Route Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a route',
  prompts: [{
    type: 'input',
    name: 'component',
    message: 'Which component should the route show?',
    validate: value => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? true : '"' + value + '" doesn\'t exist.';
      }
      return 'The path is required';
    },
  }, {
    type: 'input',
    name: 'path',
    message: 'Enter the path of the route.',
    default: '/about',
    validate: value => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'path is required';
    },
  }],
  // Add the route to the routes.js file above the error route
  // TODO smarter route adding
  actions: [{
    type: 'modify',
    path: '../../app/routes.js',
    pattern: /(\s{\n\s{6}path: '\*'\,)/g,
    templateFile: './route/route.hbs',
  }],
};
