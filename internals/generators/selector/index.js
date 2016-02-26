/**
 * Selector Generator
 */

module.exports = {
  description: 'Generate a reselect selector',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
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
  }],
  // Add the selector and the test for it
  actions: [{
    type: 'add',
    path: '../../app/selectors/{{camelCase name}}Selector.js',
    templateFile: './selector/selector.js.hbs',
    abortOnFail: true,
  }, {
    type: 'add',
    path: '../../app/selectors/tests/{{camelCase name}}Selector.test.js',
    templateFile: './selector/test.js.hbs',
    abortOnFail: true,
  }],
};
