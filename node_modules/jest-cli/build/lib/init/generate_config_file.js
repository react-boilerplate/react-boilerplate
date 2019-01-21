'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestConfig;

function _load_jestConfig() {
  return (_jestConfig = require('jest-config'));
}

const stringifyOption = function(option, map) {
  let linePrefix =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  const optionDescription = `  // ${
    (_jestConfig || _load_jestConfig()).descriptions[option]
  }`;
  const stringifiedObject = `${option}: ${JSON.stringify(
    map[option],
    null,
    2
  )}`;

  return (
    optionDescription +
    '\n' +
    stringifiedObject
      .split('\n')
      .map(line => '  ' + linePrefix + line)
      .join('\n') +
    ',\n'
  );
};
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const generateConfigFile = results => {
  const typescript = results.typescript,
    coverage = results.coverage,
    clearMocks = results.clearMocks,
    environment = results.environment;

  const overrides = {};

  if (typescript) {
    Object.assign(overrides, {
      globals: {
        'ts-jest': {
          tsConfigFile: 'tsconfig.json'
        }
      },
      moduleFileExtensions: ['ts', 'tsx', 'js'],
      testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
      }
    });
  }

  if (coverage) {
    Object.assign(overrides, {
      coverageDirectory: 'coverage'
    });
  }

  if (environment === 'node') {
    Object.assign(overrides, {
      testEnvironment: 'node'
    });
  }

  if (clearMocks) {
    Object.assign(overrides, {
      clearMocks: true
    });
  }

  const overrideKeys = Object.keys(overrides);

  const properties = [];

  for (const option in (_jestConfig || _load_jestConfig()).descriptions) {
    if (overrideKeys.includes(option)) {
      properties.push(stringifyOption(option, overrides));
    } else {
      properties.push(
        stringifyOption(
          option,
          (_jestConfig || _load_jestConfig()).defaults,
          '// '
        )
      );
    }
  }

  return (
    '// For a detailed explanation regarding each configuration property, visit:\n' +
    '// https://jestjs.io/docs/en/configuration.html\n\n' +
    'module.exports = {\n' +
    properties.join('\n') +
    '};\n'
  );
};

exports.default = generateConfigFile;
