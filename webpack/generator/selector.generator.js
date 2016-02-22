/**
 * Selector Generator
 */

module.exports = {
  description: 'Generate a reselct selector',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'form',
    validate: value => {
      if ((/.+selector/i).test(value)) {
        return 'name should not end with selector, it will be automatically added';
      }
      if ((/.+/).test(value)) {
        return true;
      }
      return 'name is required';
    }
  }],
  actions: [{
    type: 'add',
    path: '../../app/selectors/{{camelCase name}}Selector.js',
    templateFile: './templates/selector.js.hbs',
    abortOnFail: true
  }, {
    type: 'add',
    path: '../../app/selectors/tests/{{camelCase name}}Selector.test.js',
    templateFile: './templates/selector.test.js.hbs',
    abortOnFail: true
  }]
};
