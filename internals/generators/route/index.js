/**
 * Route Generator
 */

const fs = require('fs');
const componentExists = require('../utils/componentExists');
const componentName = '';

function reducerExists(comp) {
  try {
    fs.accessSync(`app/containers/${comp}/reducer.js`, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function sagasExists(comp) {
  try {
    fs.accessSync(`app/containers/${comp}/sagas.js`, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  description: 'Add a route',
  prompts: [{
    type: 'input',
    name: 'component',
    message: 'Which component should the route show?',
    validate: value => {
      componentName = value;
      if ((/.+/).test(value)) {
        return componentExists(value) ? true : `"${value}" doesn't exist.`;
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
  }, {
    type: 'confirm',
    name: 'useSagas',
    default: sagasExists(componentName) ? true : false,
    message: 'Do you want to use sagas?',
  }],

  // Add the route to the routes.js file above the error route
  // TODO smarter route adding
  actions: data => {
    const actions = [];
    if (reducerExists(data.component)) {
      actions.push({
        type: 'modify',
        path: '../../app/routes.js',
        pattern: /(\s{\n\s{0,}path: '\*',)/g,
        templateFile: './route/routeWithReducer.hbs',
      });
    } else {
      actions.push({
        type: 'modify',
        path: '../../app/routes.js',
        pattern: /(\s{\n\s{0,}path: '\*',)/g,
        templateFile: './route/route.hbs',
      });
    }

    return actions;
  },
};
