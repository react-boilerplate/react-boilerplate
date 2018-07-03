/**
 * This script is for internal `react-boilerplate`'s usage. The only purpose of generating all of these templates is
 * to be able to lint them and detect critical errors. Every generated component's name has to start with
 * 'RbGenerated' so it can be easily excluded from the test coverage reports.
 */

const nodePlop = require('node-plop');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

const xmark = require('./helpers/xmark');

process.chdir(path.join(__dirname, '../generators'));

const prettyStringify = data => JSON.stringify(data, null, 2);

const checkForErrors = result => {
  if (Array.isArray(result.failures) && result.failures.length > 0) {
    throw result.failures;
  }
};

const reportErrorsFor = title => err => {
  // TODO Replace with our own helpers/log that is guaranteed to be blocking?
  xmark(() =>
    console.error(
      chalk.red(` ERROR generating '${title}': `),
      prettyStringify(err),
    ),
  );
  process.exit(1);
};

// Generated tests are designed to fail, which would in turn fail CI builds
const removeTestsDirFrom = relativePath => () =>
  rimraf.sync(path.join(__dirname, '/../../app/', relativePath, '/tests'));

const plop = nodePlop('./index.js');

const componentGen = plop.getGenerator('component');
componentGen
  .runActions({
    name: 'RbGeneratedComponentEsclass',
    type: 'React.Component',
    wantMessages: true,
    wantLoadable: true,
  })
  .then(checkForErrors)
  .then(removeTestsDirFrom('components/RbGeneratedComponentEsclass'))
  .catch(reportErrorsFor('component/React.Component'));

componentGen
  .runActions({
    name: 'RbGeneratedComponentEsclasspure',
    type: 'React.PureComponent',
    wantMessages: true,
    wantLoadable: true,
  })
  .then(checkForErrors)
  .then(removeTestsDirFrom('components/RbGeneratedComponentEsclasspure'))
  .catch(reportErrorsFor('component/React.PureComponent'));

componentGen
  .runActions({
    name: 'RbGeneratedComponentStatelessfunction',
    type: 'Stateless Function',
    wantMessages: true,
    wantLoadable: true,
  })
  .then(checkForErrors)
  .then(removeTestsDirFrom('components/RbGeneratedComponentStatelessfunction'))
  .catch(reportErrorsFor('component/Stateless Function'));

const containerGen = plop.getGenerator('container');
containerGen
  .runActions({
    name: 'RbGeneratedContainerPureComponent',
    type: 'React.PureComponent',
    wantHeaders: true,
    wantActionsAndReducer: true,
    wantSagas: true,
    wantMessages: true,
    wantLoadable: true,
  })
  .then(checkForErrors)
  .then(removeTestsDirFrom('containers/RbGeneratedContainerPureComponent'))
  .catch(reportErrorsFor('container/React.PureComponent'));

containerGen
  .runActions({
    name: 'RbGeneratedContainerComponent',
    type: 'React.Component',
    wantHeaders: true,
    wantActionsAndReducer: true,
    wantSagas: true,
    wantMessages: true,
    wantLoadable: true,
  })
  .then(checkForErrors)
  .then(removeTestsDirFrom('containers/RbGeneratedContainerComponent'))
  .catch(reportErrorsFor('container/React.Component'));

containerGen
  .runActions({
    name: 'RbGeneratedContainerStateless',
    type: 'Stateless Function',
    wantHeaders: true,
    wantActionsAndReducer: true,
    wantSagas: true,
    wantMessages: true,
    wantLoadable: true,
  })
  .then(checkForErrors)
  .then(removeTestsDirFrom('containers/RbGeneratedContainerStateless'))
  .catch(reportErrorsFor('container/Stateless'));

const languageGen = plop.getGenerator('language');
languageGen.runActions({ language: 'fr' }).catch(reportErrorsFor('language'));
