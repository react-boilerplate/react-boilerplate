/**
 * Saga Generator
 */

module.exports = {
  description: 'Add a saga',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'requestData',
    validate: value => {
      if ((/.+saga/i).test(value)) {
        return 'The name should not end in "-saga", we add that for you!';
      }

      if ((/.+/).test(value)) {
        return true;
      }

      return 'The name is required';
    },
  }],

  // Add the saga and the test for it
  actions: [{
    type: 'add',
    path: '../../app/sagas/{{camelCase name}}.saga.js',
    templateFile: './saga/saga.js.hbs',
    abortOnFail: true,
  }, {
    type: 'add',
    path: '../../app/sagas/tests/{{camelCase name}}.test.js',
    templateFile: './saga/test.js.hbs',
    abortOnFail: true,

  // Add the saga to the sagas/index.js file so it is automatically imported
  // and added to the middleware in the app.js file
  }, {
    type: 'modify',
    path: '../../app/sagas/index.js',
    pattern: /(\n\nexport default)/gi,
    template: '\nimport { {{camelCase name}} } from \'./{{camelCase name}}.saga\';$1',
  }, {
    type: 'modify',
    path: '../../app/sagas/index.js',
    pattern: /(\n];)/gi,
    template: '\n  {{camelCase name}},$1',
  }],
};
