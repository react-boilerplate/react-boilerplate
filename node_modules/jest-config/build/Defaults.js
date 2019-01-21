'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestRegexUtil;

function _load_jestRegexUtil() {
  return (_jestRegexUtil = require('jest-regex-util'));
}

var _constants;

function _load_constants() {
  return (_constants = require('./constants'));
}

var _getCacheDirectory;

function _load_getCacheDirectory() {
  return (_getCacheDirectory = _interopRequireDefault(
    require('./getCacheDirectory')
  ));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const NODE_MODULES_REGEXP = (0,
(_jestRegexUtil || _load_jestRegexUtil()).replacePathSepForRegex)(
  (_constants || _load_constants()).NODE_MODULES
);

exports.default = {
  automock: false,
  bail: false,
  browser: false,
  cache: true,
  cacheDirectory: (0,
  (_getCacheDirectory || _load_getCacheDirectory()).default)(),
  changedFilesWithAncestor: false,
  clearMocks: false,
  collectCoverage: false,
  collectCoverageFrom: null,
  coverageDirectory: null,
  coveragePathIgnorePatterns: [NODE_MODULES_REGEXP],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: null,
  detectLeaks: false,
  detectOpenHandles: false,
  errorOnDeprecated: false,
  expand: false,
  filter: null,
  forceCoverageMatch: [],
  globalSetup: null,
  globalTeardown: null,
  globals: {},
  haste: {
    providesModuleNodeModules: []
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  moduleNameMapper: {},
  modulePathIgnorePatterns: [],
  noStackTrace: false,
  notify: false,
  notifyMode: 'always',
  preset: null,
  prettierPath: 'prettier',
  projects: null,
  resetMocks: false,
  resetModules: false,
  resolver: null,
  restoreMocks: false,
  rootDir: null,
  roots: ['<rootDir>'],
  runTestsByPath: false,
  runner: 'jest-runner',
  setupFiles: [],
  setupTestFrameworkScriptFile: null,
  skipFilter: false,
  snapshotSerializers: [],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {},
  testFailureExitCode: 1,
  testLocationInResults: false,
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: [NODE_MODULES_REGEXP],
  testRegex: '',
  testResultsProcessor: null,
  testRunner: 'jasmine2',
  testURL: 'http://localhost',
  timers: 'real',
  transform: null,
  transformIgnorePatterns: [NODE_MODULES_REGEXP],
  useStderr: false,
  verbose: null,
  watch: false,
  watchPathIgnorePatterns: [],
  watchman: true
};
