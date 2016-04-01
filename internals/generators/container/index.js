/**
 * Container Generator
 */

const fs = require('fs');
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: value => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantCSS',
    default: false,
    message: 'Does it have styling?',
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/reducer tupel for this container?',
  }, {
    type: 'confirm',
    name: 'wantSelector',
    default: true,
    message: 'Do you want to select a part of the application state?',
  }, {
    type: 'list',
    name: 'selectorType',
    message: 'Select one option',
    default: 'old',
    choices: [
      { name: 'Select from already available selectors', value: 'old' },
      { name: 'Generate new one', value: 'new' },
    ],
    when: answers => answers.wantSelector,
  }, {
    type: 'checkbox',
    name: 'selectors',
    message: 'Choose the selectors that should be added (select with space)',
    choices: fs.readdirSync('app/selectors').map(dir => ({ name: dir.slice(0, -3), value: dir.slice(0, -3) })),
    validate: value => {
      if (value.length > 0) {
        return true;
      }

      return 'At least one selector must be selected';
    },

    when: answers => answers.selectorType === 'old',
  }, {
    type: 'input',
    name: 'selectorName',
    message: 'What the selector be called?',
    default: 'form',
    validate: value => {
      if ((/.+selector/i).test(value)) {
        return 'The name should not end in "-selector", we add that for you!';
      }

      if ((/.+/).test(value)) {
        return true;
      }

      return 'The name is required';
    },

    when: answers => answers.selectorType === 'new',
  }],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../app/containers/{{properCase name}}/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../app/containers/{{properCase name}}/tests/index.test.js',
      templateFile: './container/test.js.hbs',
      abortOnFail: true,
    }];

    // If they want a CSS file, add styles.css
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/styles.css',
        templateFile: './container/styles.css.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/actions.test.js',
        templateFile: './container/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/reducer.test.js',
        templateFile: './container/reducer.test.js.hbs',
        abortOnFail: true,
      });
      actions.push({ // Add the reducer to the reducer.js file
        type: 'modify',
        path: '../../app/reducers.js',
        pattern: /(\.\.\.asyncReducers,\n {2}}\);)/gi,
        template: '{{camelCase name}}: {{camelCase name}}Reducer,\n    $1',
      });
      actions.push({
        type: 'modify',
        path: '../../app/reducers.js',
        pattern: /(export default function createReducer)/gi,
        template: 'import {{camelCase name}}Reducer from \'{{properCase name}}/reducer\';\n$1',
      });
    }

    // Generate a new selector
    if (data.selectorType === 'new') {
      actions.push({
        type: 'add',
        path: '../../app/selectors/{{camelCase selectorName}}Selector.js',
        templateFile: './container/selector.js.hbs', // Use our own selector.js.hbs template because the variable is selectorName
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/selectors/tests/{{camelCase selectorName}}Selector.test.js',
        templateFile: './selector/test.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
