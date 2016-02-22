/**
 * Component Generator
 */

module.exports = {
  description: 'Generate a Component either using ES6 class or Stateless Function',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['ES6 Class', 'Stateless Function']
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: value => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'name is required';
    }
  }, {
    type: 'confirm',
    name: 'wantCSS',
    message: 'Do you want to create corresponding CSS file?'
  }],
  actions: data => {
    const actions = [{
      type: 'add',
      path: '../../app/components/{{properCase name}}/index.js',
      templateFile: data.type === 'ES6 Class' ? './templates/component/es6.js.hbs' : './templates/component/stateless.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: '../../app/components/{{properCase name}}/index.test.js',
      templateFile: './templates/component/component.test.js.hbs',
      abortOnFail: true
    }];

    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/styles.css',
        templateFile: './templates/component/styles.css.hbs',
        abortOnFail: true
      });
    }

    return actions;
  }
};
