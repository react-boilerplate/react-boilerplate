/**
 * Route Generator
 */
const fs = require('fs');
const path = require('path');
const componentExists = require('../utils/componentExists');

function trimTemplateFile(template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(path.join(__dirname, `./${template}`), 'utf8').replace(/\s*$/, '');
}

function hasLoader(component) {
  return fs.readFileSync(path.join(__dirname, '../../../app/routes.js'), 'utf8')
    .includes(`import create${component}Loader`);
}

module.exports = {
  description: 'Add a route',
  prompts: [{
    type: 'input',
    name: 'component',
    message: 'Which component should the route show?',
    validate: (value) => {
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
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }

      return 'path is required';
    },
  }],

  // Add the route to the routes.js file above the error route
  // TODO smarter route adding
  actions: (data) => {
    const actions = [
      {
        type: 'modify',
        path: '../../app/routes.js',
        pattern: /(\s+<AsyncRoute\n\s+ path="")/g,
        template: trimTemplateFile('route.hbs'),
      },
    ];

    if (!hasLoader(data.component)) {
      actions.push({
        type: 'modify',
        path: '../../app/routes.js',
        pattern: /(import createNotFoundPageLoader)/g,
        template: trimTemplateFile('importLoader.hbs'),
      });
    }

    return actions;
  },
};
