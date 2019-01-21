'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _fs;

function _load_fs() {
  return (_fs = _interopRequireDefault(require('fs')));
}

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

var _prompts;

function _load_prompts() {
  return (_prompts = _interopRequireDefault(require('prompts')));
}

var _questions;

function _load_questions() {
  return (_questions = _interopRequireDefault(require('./questions')));
}

var _questions2;

function _load_questions2() {
  return (_questions2 = require('./questions'));
}

var _errors;

function _load_errors() {
  return (_errors = require('./errors'));
}

var _constants;

function _load_constants() {
  return (_constants = require('../../constants'));
}

var _generate_config_file;

function _load_generate_config_file() {
  return (_generate_config_file = _interopRequireDefault(
    require('./generate_config_file')
  ));
}

var _modify_package_json;

function _load_modify_package_json() {
  return (_modify_package_json = _interopRequireDefault(
    require('./modify_package_json')
  ));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

exports.default = _asyncToGenerator(function*() {
  let rootDir =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : process.cwd();

  // prerequisite checks
  const projectPackageJsonPath = (_path || _load_path()).default.join(
    rootDir,
    (_constants || _load_constants()).PACKAGE_JSON
  );
  const jestConfigPath = (_path || _load_path()).default.join(
    rootDir,
    (_constants || _load_constants()).JEST_CONFIG
  );

  if (!(_fs || _load_fs()).default.existsSync(projectPackageJsonPath)) {
    throw new (_errors || _load_errors()).NotFoundPackageJsonError(rootDir);
  }

  const questions = (_questions || _load_questions()).default.slice(0);
  let hasJestProperty = false;
  let hasJestConfig = false;
  let projectPackageJson;

  try {
    projectPackageJson = JSON.parse(
      (_fs || _load_fs()).default.readFileSync(projectPackageJsonPath, 'utf-8')
    );
  } catch (error) {
    throw new (
      _errors || _load_errors()
    ).MalformedPackageJsonError(projectPackageJsonPath);
  }

  if (projectPackageJson.jest) {
    hasJestProperty = true;
  }

  if ((_fs || _load_fs()).default.existsSync(jestConfigPath)) {
    hasJestConfig = true;
  }

  if (hasJestProperty || hasJestConfig) {
    const result = yield (0, (_prompts || _load_prompts()).default)({
      initial: true,
      message:
        'It seems that you already have a jest configuration, do you want to override it?',
      name: 'continue',
      type: 'confirm'
    });

    if (!result.continue) {
      console.log();
      console.log('Aborting...');
      return;
    }
  }

  // Add test script installation only if needed
  if (
    !projectPackageJson.scripts ||
    projectPackageJson.scripts.test !== 'jest'
  ) {
    questions.unshift((_questions2 || _load_questions2()).testScriptQuestion);
  }

  // Try to detect typescript and add a question if needed
  const deps = {};

  Object.assign(
    deps,
    projectPackageJson.dependencies,
    projectPackageJson.devDependencies
  );

  if (Object.keys(deps).includes('typescript')) {
    questions.unshift((_questions2 || _load_questions2()).typescriptQuestion);
  }

  // Start the init process
  console.log();
  console.log(
    (_chalk || _load_chalk()).default.underline(
      `The following questions will help Jest to create a suitable configuration for your project\n`
    )
  );

  let promptAborted = false;

  const results = yield (0, (_prompts || _load_prompts()).default)(questions, {
    onCancel: function() {
      promptAborted = true;
    }
  });

  if (promptAborted) {
    console.log();
    console.log('Aborting...');
    return;
  }

  const shouldModifyScripts = results.scripts;

  if (shouldModifyScripts || hasJestProperty) {
    const modifiedPackageJson = (0,
    (_modify_package_json || _load_modify_package_json()).default)({
      projectPackageJson: projectPackageJson,
      shouldModifyScripts: shouldModifyScripts
    });

    (_fs || _load_fs()).default.writeFileSync(
      projectPackageJsonPath,
      modifiedPackageJson
    );

    console.log('');
    console.log(
      `✏️  Modified ${(_chalk || _load_chalk()).default.cyan(
        projectPackageJsonPath
      )}`
    );
  }

  const generatedConfig = (0,
  (_generate_config_file || _load_generate_config_file()).default)(results);

  (_fs || _load_fs()).default.writeFileSync(jestConfigPath, generatedConfig);

  console.log('');
  console.log(
    `📝  Configuration file created at ${(_chalk || _load_chalk()).default.cyan(
      jestConfigPath
    )}`
  );
});
