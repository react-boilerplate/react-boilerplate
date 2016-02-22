const fs = require('fs');
module.exports = plop => {
  // Check whether the given component exist in either components or containers directory
  const componentExists = comp => {
    const pageComponents = fs.readdirSync('app/components');
    const pageContainers = fs.readdirSync('app/containers');
    const components = pageComponents.concat(pageContainers);

    return components.indexOf(comp) >= 0;
  };

  // Stateless component generator
  plop.setGenerator('component', {
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
        path: '../app/components/{{properCase name}}/index.js',
        templateFile: data.type === 'ES6 Class' ? './webpack/templates/component/es6.js.hbs' : './webpack/templates/component/stateless.js.hbs',
        abortOnFail: true
      }, {
        type: 'add',
        path: '../app/components/{{properCase name}}/index.test.js',
        templateFile: './templates/component/component.test.js.hbs',
        abortOnFail: true
      }];

      if (data.wantCSS) {
        actions.push({
          type: 'add',
          path: '../app/components/{{properCase name}}/styles.css',
          templateFile: './templates/component/styles.css.hbs',
          abortOnFail: true
        });
      }

      return actions;
    }
  });

  // Container Component Generator
  plop.setGenerator('container', {
    description: 'Generate a Container Component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      }
    }, {
      type: 'confirm',
      name: 'wantCSS',
      default: false,
      message: 'Do you want to create corresponding CSS file?'
    }, {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message: 'Do you want to generate corresponding actions/reducer files for the container?'
    }, {
      type: 'confirm',
      name: 'wantSelector',
      default: true,
      message: 'Do you want to add selectors to the connect method?'
    }, {
      type: 'list',
      name: 'selectorType',
      message: 'Select one option',
      default: 'old',
      choices: [
        { name: 'Select from already available selectors', value: 'old' },
        { name: 'Generate new one', value: 'new' }
      ],
      when: answers => answers.wantSelector
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
      when: answers => answers.selectorType === 'old'
    }, {
      type: 'input',
      name: 'selectorName',
      message: 'What the selector should it be called?',
      default: 'form',
      validate: value => {
        if ((/.+saga/i).test(value)) {
          return 'name should not end with selector, it will be automatically added';
        }
        if ((/.+/).test(value)) {
          return true;
        }
        return 'selector name is required';
      },
      when: answers => answers.selectorType === 'new'
    }],
    actions: data => {
      const actions = [{
        type: 'add',
        path: '../app/containers/{{properCase name}}/index.js',
        templateFile: './templates/container/index.js.hbs',
        abortOnFail: true
      }, {
        type: 'add',
        path: '../app/containers/{{properCase name}}/tests/index.test.js',
        templateFile: './templates/container/container.test.js.hbs',
        abortOnFail: true
      }];

      if (data.wantCSS) {
        actions.push({
          type: 'add',
          path: '../app/containers/{{properCase name}}/styles.css',
          templateFile: './templates/container/styles.css.hbs',
          abortOnFail: true
        });
      }

      if (data.wantActionsAndReducer) {
        // Generate Actions
        actions.push({
          type: 'add',
          path: '../app/containers/{{properCase name}}/actions.js',
          templateFile: './templates/container/actions.js.hbs',
          abortOnFail: true
        });
        actions.push({
          type: 'add',
          path: '../app/containers/{{properCase name}}/tests/actions.test.js',
          templateFile: './templates/container/actions.test.js.hbs',
          abortOnFail: true
        });

        // Generate constants
        actions.push({
          type: 'add',
          path: '../app/containers/{{properCase name}}/constants.js',
          templateFile: './templates/container/constants.js.hbs',
          abortOnFail: true
        });

        // Generate Reducer
        actions.push({
          type: 'add',
          path: '../app/containers/{{properCase name}}/reducer.js',
          templateFile: './templates/container/reducer.js.hbs',
          abortOnFail: true
        });
        actions.push({
          type: 'modify',
          path: '../app/rootReducer.js',
          pattern: /(\n}\);)/gi,
          template: ',\n  {{camelCase name}}: {{camelCase name}}Reducer$1'
        });
        actions.push({
          type: 'modify',
          path: '../app/rootReducer.js',
          pattern: /(\n\nexport default combineReducers)/gi,
          template: '\nimport {{camelCase name}}Reducer from \'{{properCase name}}/reducer\';$1'
        });
        actions.push({
          type: 'add',
          path: '../app/containers/{{properCase name}}/tests/reducer.test.js',
          templateFile: './templates/container/reducer.test.js.hbs',
          abortOnFail: true
        });
      }

      if (data.selectorType === 'new') {
        actions.push({
          type: 'add',
          path: '../app/selectors/{{camelCase selectorName}}Selector.js',
          templateFile: './templates/container/selector.js.hbs',
          abortOnFail: true
        });
        actions.push({
          type: 'add',
          path: '../app/selectors/tests/{{camelCase selectorName}}Selector.test.js',
          templateFile: './templates/selector.test.js.hbs',
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
      path: '../app/selectors/{{camelCase name}}Selector.js',
      templateFile: './templates/selector.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: '../app/selectors/tests/{{camelCase name}}Selector.test.js',
      templateFile: './templates/selector.test.js.hbs',
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
      path: '../app/sagas/{{camelCase name}}.saga.js',
      templateFile: './templates/saga.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: '../app/sagas/tests/{{camelCase name}}.test.js',
      templateFile: './templates/saga.test.js.hbs',
      abortOnFail: true
    }, {
      type: 'modify',
      path: '../app/sagas/index.js',
      pattern: /(\n\nexport default)/gi,
      template: '\nimport { {{camelCase name}}Saga } from \'./{{camelCase name}}.saga\';$1'
    }, {
      type: 'modify',
      path: '../app/sagas/index.js',
      pattern: /(\n];)/gi,
      template: ',\n  {{camelCase name}}Saga$1'
    }]
  });

  // Route generator
  plop.setGenerator('route', {
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
        if ((/\/.+/).test(value)) {
          return 'path should not start with "/", it will be automatically added';
        }
        if ((/.+/).test(value)) {
          return true;
        }
        return 'path is required';
      }
    }],
    actions: [{
      type: 'modify',
      path: '../app/routes.js',
      pattern: /(\s{\n\s{4}path: '\*')/g,
      templateFile: './templates/route.hbs'
    }]
  });
};
