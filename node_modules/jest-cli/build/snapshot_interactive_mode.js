'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _ansiEscapes;

function _load_ansiEscapes() {
  return (_ansiEscapes = _interopRequireDefault(require('ansi-escapes')));
}

var _jestWatcher;

function _load_jestWatcher() {
  return (_jestWatcher = require('jest-watcher'));
}

var _utils;

function _load_utils() {
  return (_utils = require('./reporters/utils'));
}

var _constants;

function _load_constants() {
  return (_constants = require('./constants'));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 */

class SnapshotInteractiveMode {
  constructor(pipe) {
    this._pipe = pipe;
    this._isActive = false;
    this._skippedNum = 0;
  }

  isActive() {
    return this._isActive;
  }

  getSkippedNum() {
    return this._skippedNum;
  }

  _clearTestSummary() {
    this._pipe.write((_ansiEscapes || _load_ansiEscapes()).default.cursorUp(6));
    this._pipe.write((_ansiEscapes || _load_ansiEscapes()).default.eraseDown);
  }

  _drawUIProgress() {
    this._clearTestSummary();
    const numPass = this._countPaths - this._testAssertions.length;
    const numRemaining = this._countPaths - numPass - this._skippedNum;

    let stats = (_chalk || _load_chalk()).default.bold.dim(
      (0, (_utils || _load_utils()).pluralize)('snapshot', numRemaining) +
        ' remaining'
    );
    if (numPass) {
      stats +=
        ', ' +
        (_chalk || _load_chalk()).default.bold.green(
          (0, (_utils || _load_utils()).pluralize)('snapshot', numPass) +
            ' updated'
        );
    }
    if (this._skippedNum) {
      stats +=
        ', ' +
        (_chalk || _load_chalk()).default.bold.yellow(
          (0, (_utils || _load_utils()).pluralize)(
            'snapshot',
            this._skippedNum
          ) + ' skipped'
        );
    }
    const messages = [
      '\n' +
        (_chalk || _load_chalk()).default.bold('Interactive Snapshot Progress'),
      (_constants || _load_constants()).ARROW + stats,
      '\n' + (_chalk || _load_chalk()).default.bold('Watch Usage'),
      (_chalk || _load_chalk()).default.dim(
        (_constants || _load_constants()).ARROW + 'Press '
      ) +
        'u' +
        (_chalk || _load_chalk()).default.dim(
          ' to update failing snapshots for this test.'
        ),
      (_chalk || _load_chalk()).default.dim(
        (_constants || _load_constants()).ARROW + 'Press '
      ) +
        's' +
        (_chalk || _load_chalk()).default.dim(' to skip the current test.'),
      (_chalk || _load_chalk()).default.dim(
        (_constants || _load_constants()).ARROW + 'Press '
      ) +
        'q' +
        (_chalk || _load_chalk()).default.dim(
          ' to quit Interactive Snapshot Mode.'
        ),
      (_chalk || _load_chalk()).default.dim(
        (_constants || _load_constants()).ARROW + 'Press '
      ) +
        'Enter' +
        (_chalk || _load_chalk()).default.dim(' to trigger a test run.')
    ];

    this._pipe.write(messages.filter(Boolean).join('\n') + '\n');
  }

  _drawUIDoneWithSkipped() {
    this._pipe.write((_ansiEscapes || _load_ansiEscapes()).default.clearScreen);
    const numPass = this._countPaths - this._testAssertions.length;

    let stats = (_chalk || _load_chalk()).default.bold.dim(
      (0, (_utils || _load_utils()).pluralize)('snapshot', this._countPaths) +
        ' reviewed'
    );
    if (numPass) {
      stats +=
        ', ' +
        (_chalk || _load_chalk()).default.bold.green(
          (0, (_utils || _load_utils()).pluralize)('snapshot', numPass) +
            ' updated'
        );
    }
    if (this._skippedNum) {
      stats +=
        ', ' +
        (_chalk || _load_chalk()).default.bold.yellow(
          (0, (_utils || _load_utils()).pluralize)(
            'snapshot',
            this._skippedNum
          ) + ' skipped'
        );
    }
    const messages = [
      '\n' +
        (_chalk || _load_chalk()).default.bold('Interactive Snapshot Result'),
      (_constants || _load_constants()).ARROW + stats,
      '\n' + (_chalk || _load_chalk()).default.bold('Watch Usage'),
      (_chalk || _load_chalk()).default.dim(
        (_constants || _load_constants()).ARROW + 'Press '
      ) +
        'r' +
        (_chalk || _load_chalk()).default.dim(
          ' to restart Interactive Snapshot Mode.'
        ),
      (_chalk || _load_chalk()).default.dim(
        (_constants || _load_constants()).ARROW + 'Press '
      ) +
        'q' +
        (_chalk || _load_chalk()).default.dim(
          ' to quit Interactive Snapshot Mode.'
        )
    ];

    this._pipe.write(messages.filter(Boolean).join('\n') + '\n');
  }

  _drawUIDone() {
    this._pipe.write((_ansiEscapes || _load_ansiEscapes()).default.clearScreen);
    const numPass = this._countPaths - this._testAssertions.length;

    let stats = (_chalk || _load_chalk()).default.bold.dim(
      (0, (_utils || _load_utils()).pluralize)('snapshot', this._countPaths) +
        ' reviewed'
    );
    if (numPass) {
      stats +=
        ', ' +
        (_chalk || _load_chalk()).default.bold.green(
          (0, (_utils || _load_utils()).pluralize)('snapshot', numPass) +
            ' updated'
        );
    }
    const messages = [
      '\n' +
        (_chalk || _load_chalk()).default.bold('Interactive Snapshot Result'),
      (_constants || _load_constants()).ARROW + stats,
      '\n' + (_chalk || _load_chalk()).default.bold('Watch Usage'),
      (_chalk || _load_chalk()).default.dim(
        (_constants || _load_constants()).ARROW + 'Press '
      ) +
        'Enter' +
        (_chalk || _load_chalk()).default.dim(' to return to watch mode.')
    ];

    this._pipe.write(messages.filter(Boolean).join('\n') + '\n');
  }

  _drawUIOverlay() {
    if (this._testAssertions.length === 0) {
      return this._drawUIDone();
    }

    if (this._testAssertions.length - this._skippedNum === 0) {
      return this._drawUIDoneWithSkipped();
    }

    return this._drawUIProgress();
  }

  put(key) {
    switch (key) {
      case 's':
        if (this._skippedNum === this._testAssertions.length) break;
        this._skippedNum += 1;

        // move skipped test to the end
        this._testAssertions.push(this._testAssertions.shift());
        if (this._testAssertions.length - this._skippedNum > 0) {
          this._run(false);
        } else {
          this._drawUIDoneWithSkipped();
        }

        break;
      case 'u':
        this._run(true);
        break;
      case 'q':
      case (_jestWatcher || _load_jestWatcher()).KEYS.ESCAPE:
        this.abort();
        break;
      case 'r':
        this.restart();
        break;
      case (_jestWatcher || _load_jestWatcher()).KEYS.ENTER:
        if (this._testAssertions.length === 0) {
          this.abort();
        } else {
          this._run(false);
        }
        break;
      default:
        break;
    }
  }

  abort() {
    this._isActive = false;
    this._skippedNum = 0;
    this._updateTestRunnerConfig(null, false);
  }

  restart() {
    this._skippedNum = 0;
    this._countPaths = this._testAssertions.length;
    this._run(false);
  }

  updateWithResults(results) {
    const hasSnapshotFailure = !!results.snapshot.failure;
    if (hasSnapshotFailure) {
      this._drawUIOverlay();
      return;
    }

    this._testAssertions.shift();
    if (this._testAssertions.length - this._skippedNum === 0) {
      this._drawUIOverlay();
      return;
    }

    // Go to the next test
    this._run(false);
  }

  _run(shouldUpdateSnapshot) {
    const testAssertion = this._testAssertions[0];
    this._updateTestRunnerConfig(testAssertion, shouldUpdateSnapshot);
  }

  run(failedSnapshotTestAssertions, onConfigChange) {
    if (!failedSnapshotTestAssertions.length) {
      return;
    }

    this._testAssertions = [].concat(failedSnapshotTestAssertions);
    this._countPaths = this._testAssertions.length;
    this._updateTestRunnerConfig = onConfigChange;
    this._isActive = true;
    this._run(false);
  }
}
exports.default = SnapshotInteractiveMode;
