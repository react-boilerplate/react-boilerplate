/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const appConfig = require('../config');
const prettierexcutor = require('../scripts/helpers/prettierexcutor');
const componentGenerator = require('./component');
const containerGenerator = require('./container');
const languageGenerator = require('./language');

module.exports = (plop) => {
  plop.setActionType('prettierjs', (answers, actionConfig, pl) => {
    const prettierResult = [];
    const patterns = [];
    actionConfig.paths.forEach((newFilePath) => {
      patterns.push(
        path.join(__dirname, pl.renderString(newFilePath, answers))
      );
    });
    const ignores = appConfig.prettier.jsConfig.ignores;
    const options = appConfig.prettier.jsConfig.options;
    prettierResult.push(
      prettierexcutor(
        {
          options,
          patterns,
          ignores,
        },
        true
      )
    );

    let didError = false;

    prettierResult.forEach((item) => {
      didError = didError || item.didError;
    });
    return didError ? 'Prettier failed' : 'Prettier successed';
  });
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('language', languageGenerator);
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../app/containers/${comp}`),
        fs.F_OK
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
