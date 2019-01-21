'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestWatcher;

function _load_jestWatcher() {
  return (_jestWatcher = require('jest-watcher'));
}

var _snapshot_interactive_mode;

function _load_snapshot_interactive_mode() {
  return (_snapshot_interactive_mode = _interopRequireDefault(
    require('../snapshot_interactive_mode')
  ));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

class UpdateSnapshotInteractivePlugin extends (
  _jestWatcher || _load_jestWatcher()
).BaseWatchPlugin {
  constructor(options) {
    super(options);
    this._failedSnapshotTestAssertions = [];
    this._snapshotInteractiveMode = new (
      _snapshot_interactive_mode || _load_snapshot_interactive_mode()
    ).default(this._stdout);
    this.isInternal = true;
  }

  getFailedSnapshotTestAssertions(testResults) {
    const failedTestPaths = [];
    if (testResults.numFailedTests === 0 || !testResults.testResults) {
      return failedTestPaths;
    }

    testResults.testResults.forEach(testResult => {
      if (testResult.snapshot && testResult.snapshot.unmatched) {
        testResult.testResults.forEach(result => {
          if (result.status === 'failed') {
            failedTestPaths.push({
              path: testResult.testFilePath,
              title: result.title
            });
          }
        });
      }
    });

    return failedTestPaths;
  }

  apply(hooks) {
    hooks.onTestRunComplete(results => {
      this._failedSnapshotTestAssertions = this.getFailedSnapshotTestAssertions(
        results
      );
      if (this._snapshotInteractiveMode.isActive()) {
        this._snapshotInteractiveMode.updateWithResults(results);
      }
    });
  }

  onKey(key) {
    if (this._snapshotInteractiveMode.isActive()) {
      this._snapshotInteractiveMode.put(key);
    }
  }

  run(globalConfig, updateConfigAndRun) {
    if (this._failedSnapshotTestAssertions.length) {
      return new Promise(res => {
        this._snapshotInteractiveMode.run(
          this._failedSnapshotTestAssertions,
          (assertion, shouldUpdateSnapshot) => {
            updateConfigAndRun({
              mode: 'watch',
              testNamePattern: assertion ? `^${assertion.title}$` : '',
              testPathPattern: assertion ? assertion.path : '',

              updateSnapshot: shouldUpdateSnapshot ? 'all' : 'none'
            });
            if (!this._snapshotInteractiveMode.isActive()) {
              res();
            }
          }
        );
      });
    } else {
      return Promise.resolve();
    }
  }

  getUsageInfo(globalConfig) {
    if (
      this._failedSnapshotTestAssertions &&
      this._failedSnapshotTestAssertions.length > 0
    ) {
      return {
        key: 'i',
        prompt: 'update failing snapshots interactively'
      };
    }

    return null;
  }
} /**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
exports.default = UpdateSnapshotInteractivePlugin;
