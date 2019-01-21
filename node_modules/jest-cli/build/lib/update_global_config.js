'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestRegexUtil;

function _load_jestRegexUtil() {
  return (_jestRegexUtil = require('jest-regex-util'));
}

exports.default = (globalConfig, options) => {
  // $FlowFixMe Object.assign
  const newConfig = Object.assign({}, globalConfig);

  if (!options) {
    options = {};
  }

  if (options.mode === 'watch') {
    newConfig.watch = true;
    newConfig.watchAll = false;
  } else if (options.mode === 'watchAll') {
    newConfig.watch = false;
    newConfig.watchAll = true;
  }

  if (options.testNamePattern !== undefined) {
    newConfig.testNamePattern = options.testNamePattern || '';
  }

  if (options.testPathPattern !== undefined) {
    newConfig.testPathPattern =
      (0, (_jestRegexUtil || _load_jestRegexUtil()).replacePathSepForRegex)(
        options.testPathPattern
      ) || '';
  }

  newConfig.onlyChanged = false;
  newConfig.onlyChanged =
    !newConfig.watchAll &&
    !newConfig.testNamePattern &&
    !newConfig.testPathPattern;

  if (options.bail !== undefined) {
    newConfig.bail = options.bail || false;
  }

  if (options.changedSince !== undefined) {
    newConfig.changedSince = options.changedSince;
  }

  if (options.collectCoverage !== undefined) {
    newConfig.collectCoverage = options.collectCoverage || false;
  }

  if (options.collectCoverageFrom !== undefined) {
    newConfig.collectCoverageFrom = options.collectCoverageFrom;
  }

  if (options.collectCoverageOnlyFrom !== undefined) {
    newConfig.collectCoverageOnlyFrom = options.collectCoverageOnlyFrom;
  }

  if (options.coverageDirectory !== undefined) {
    newConfig.coverageDirectory = options.coverageDirectory;
  }

  if (options.coverageReporters !== undefined) {
    newConfig.coverageReporters = options.coverageReporters;
  }

  if (options.noSCM) {
    newConfig.noSCM = true;
  }

  if (options.notify !== undefined) {
    newConfig.notify = options.notify || false;
  }

  if (options.notifyMode !== undefined) {
    newConfig.notifyMode = options.notifyMode;
  }

  if (options.onlyFailures !== undefined) {
    newConfig.onlyFailures = options.onlyFailures || false;
  }

  if (options.passWithNoTests !== undefined) {
    newConfig.passWithNoTests = true;
  }

  if (options.reporters !== undefined) {
    newConfig.reporters = options.reporters;
  }

  if (options.updateSnapshot !== undefined) {
    newConfig.updateSnapshot = options.updateSnapshot;
  }

  if (options.verbose !== undefined) {
    newConfig.verbose = options.verbose || false;
  }

  return Object.freeze(newConfig);
};
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
