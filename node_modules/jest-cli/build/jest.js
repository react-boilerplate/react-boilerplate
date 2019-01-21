'use strict';

var _package;

function _load_package() {
  return (_package = require('../package.json'));
}

var _SearchSource;

function _load_SearchSource() {
  return (_SearchSource = _interopRequireDefault(require('./SearchSource')));
}

var _TestScheduler;

function _load_TestScheduler() {
  return (_TestScheduler = _interopRequireDefault(require('./TestScheduler')));
}

var _TestWatcher;

function _load_TestWatcher() {
  return (_TestWatcher = _interopRequireDefault(require('./TestWatcher')));
}

var _cli;

function _load_cli() {
  return (_cli = require('./cli'));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = {
  SearchSource: (_SearchSource || _load_SearchSource()).default,
  TestScheduler: (_TestScheduler || _load_TestScheduler()).default,
  TestWatcher: (_TestWatcher || _load_TestWatcher()).default,
  getVersion: () => (_package || _load_package()).version,
  run: (_cli || _load_cli()).run,
  runCLI: (_cli || _load_cli()).runCLI
};
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
