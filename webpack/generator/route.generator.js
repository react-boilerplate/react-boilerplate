/**
 * Route Generator
 */

const componentExists = require('./utils/componentExists');

module.exports = {
  description: 'Generate a route',
  prompts: [{
    type: 'input',
    name: 'component',
    message: 'Enter the name of the component for which the route should be generated?',
    validate: value => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? true : 'Component doesn\'t exist in either components or containers folder';
      }
      return 'path is required';
    }
  }, {
    type: 'input',
    name: 'path',
    message: 'What should be the router path?',
    default: 'about',
    validate: value => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'path is required';
    }
  }],
  actions: [{
    type: 'modify',
    path: '../../app/routes.js',
    pattern: /(\s{\n\s{4}path: '\*')/g,
    templateFile: './templates/route.hbs'
  }]
};
