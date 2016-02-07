module.exports = plop => {
  // Custom directory picker
  plop.addPrompt('directory', require('inquirer-directory'));

  // Stateless component generator
  plop.setGenerator('component', {
    description: 'Generate a Component either using ES6 class or Stateless Function',
    prompts: [{
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      choices: () => ['ES6 Class', 'Stateless Function']
    }, {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe what the component does?',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'description is required';
      }
    }, {
      type: 'directory',
      name: 'path',
      message: 'where would you like to put this component?',
      basePath: plop.getPlopfilePath() + '/app/components'
    }, {
      type: 'confirm',
      name: 'wantCSS',
      message: 'Do you want to create corresponding CSS file?'
    }],
    actions: data => {
      const actions = [{
        type: 'add',
        path: 'app/components/{{ path }}/{{properCase name}}/index.js',
        templateFile: data.type === 'ES6 Class' ? './plop_templates/component/es6.js.hbs' : './plop_templates/component/stateless.js.hbs',
        abortOnFail: true
      }, {
        type: 'add',
        path: 'app/components/{{path}}/{{properCase name}}/{{properCase name}}.test.js',
        templateFile: './plop_templates/component/component.test.js.hbs',
        abortOnFail: true
      }];

      if (data.wantCSS) {
        actions.push({
          type: 'add',
          path: 'app/components/{{path}}/{{properCase name}}/styles.css',
          templateFile: './plop_templates/component/styles.css.hbs',
          abortOnFail: true
        });
      }

      return actions;
    }
  });

  // Page Component Generator
  plop.setGenerator('page', {
    description: 'Generate a Page Container Component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      }
    }, {
      type: 'input',
      name: 'path',
      message: 'What should be the router path?',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'path is required';
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe what the page does?',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'description is required';
      }
    }, {
      type: 'confirm',
      name: 'wantCSS',
      message: 'Do you want to create corresponding CSS file?'
    }, {
      type: 'confirm',
      name: 'connectRedux',
      message: 'Do you want to connect the page to a redux store/dispatch actions?'
    }, {
      type: 'confirm',
      name: 'wantActions',
      message: 'Do you want to generate corresponding actions file for the page?',
      when: answers => answers.connectRedux
    }, {
      type: 'confirm',
      name: 'wantReducer',
      message: 'Do you want to generate corresponding reducer file for the page?',
      when: answers => answers.connectRedux
    }],
    actions: data => {
      const actions = [{
        type: 'add',
        path: 'app/containers/{{properCase name}}Page/index.js',
        templateFile: 'plop_templates/container/index.js.hbs',
        abortOnFail: true
      }, {
        type: 'add',
        path: 'app/containers/{{properCase name}}Page/{{properCase name}}Page.test.js',
        templateFile: 'plop_templates/container/container.test.js.hbs',
        abortOnFail: true
      }, {
        type: 'modify',
        path: 'app/app.js',
        pattern: /(\n\s{8}<Route\n\s{10}path="\*")/g,
        templateFile: 'plop_templates/route.hbs'
      }];

      if (data.wantCSS) {
        actions.push({
          type: 'add',
          path: 'app/containers/{{properCase name}}Page/styles.css',
          templateFile: 'plop_templates/container/styles.css.hbs',
          abortOnFail: true
        });
      }

      if (data.wantActions) {
        actions.push({
          type: 'add',
          path: 'app/containers/{{properCase name}}Page/actions.js',
          template: '\n',
          abortOnFail: true
        });
        actions.push({
          type: 'add',
          path: 'app/containers/{{properCase name}}Page/tests/actions.js',
          templateFile: 'plop_templates/container/actions.test.js.hbs',
          abortOnFail: true
        });
        actions.push({
          type: 'add',
          path: 'app/containers/{{properCase name}}Page/constants.js',
          template: '\n',
          abortOnFail: true
        });
      }

      if (data.wantReducer) {
        actions.push({
          type: 'add',
          path: 'app/containers/{{properCase name}}Page/reducer.js',
          templateFile: 'plop_templates/container/reducer.js.hbs',
          abortOnFail: true
        });
        actions.push({
          type: 'modify',
          path: 'app/rootReducer.js',
          pattern: /(\n}\);)/gi,
          template: ',\n  {{camelCase name}}Page: {{camelCase name}}PageReducer$1'
        });
        actions.push({
          type: 'modify',
          path: 'app/rootReducer.js',
          pattern: /(\n\nexport default combineReducers)/gi,
          template: '\nimport {{camelCase name}}PageReducer from \'{{properCase name}}Page/reducer\';$1'
        });
        actions.push({
          type: 'add',
          path: 'app/containers/{{properCase name}}Page/tests/reducer.js',
          templateFile: 'plop_templates/container/reducer.test.js.hbs',
          abortOnFail: true
        });
      }

      return actions;
    }
  });

  // Selector generator
  plop.setGenerator('selector', {
    description: 'Generate a reselct selector',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      }
    }],
    actions: [{
      type: 'add',
      path: 'app/selectors/{{camelCase name}}Selector.js',
      templateFile: './plop_templates/selector.js.hbs',
      abortOnFail: true
    }]
  });

  // Saga generator
  plop.setGenerator('saga', {
    description: 'Generate a saga',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      }
    }],
    actions: [{
      type: 'add',
      path: 'app/sagas/{{camelCase name}}.saga.js',
      templateFile: './plop_templates/saga.js.hbs',
      abortOnFail: true
    }]
  });
};
