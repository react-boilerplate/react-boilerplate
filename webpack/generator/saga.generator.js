/**
 * Saga Generator
 */

module.exports = {
  description: 'Generate a saga',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'requestData',
    validate: value => {
      if ((/.+saga/i).test(value)) {
        return 'name should not end with saga, it will be automatically added';
      }
      if ((/.+/).test(value)) {
        return true;
      }
      return 'name is required';
    }
  }],
  actions: [{
    type: 'add',
    path: '../../app/sagas/{{camelCase name}}.saga.js',
    templateFile: './templates/saga.js.hbs',
    abortOnFail: true
  }, {
    type: 'add',
    path: '../../app/sagas/tests/{{camelCase name}}.test.js',
    templateFile: './templates/saga.test.js.hbs',
    abortOnFail: true
  }, {
    type: 'modify',
    path: '../../app/sagas/index.js',
    pattern: /(\n\nexport default)/gi,
    template: '\nimport { {{camelCase name}}Saga } from \'./{{camelCase name}}.saga\';$1'
  }, {
    type: 'modify',
    path: '../../app/sagas/index.js',
    pattern: /(\n];)/gi,
    template: ',\n  {{camelCase name}}Saga$1'
  }]
};
