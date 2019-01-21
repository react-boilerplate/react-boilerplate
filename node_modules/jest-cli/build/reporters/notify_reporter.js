'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    }
  };
})();
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

var _exit;

function _load_exit() {
  return (_exit = _interopRequireDefault(require('exit')));
}

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

var _util;

function _load_util() {
  return (_util = _interopRequireDefault(require('util')));
}

var _nodeNotifier;

function _load_nodeNotifier() {
  return (_nodeNotifier = _interopRequireDefault(require('node-notifier')));
}

var _base_reporter;

function _load_base_reporter() {
  return (_base_reporter = _interopRequireDefault(require('./base_reporter')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

const isDarwin = process.platform === 'darwin';

const icon = (_path || _load_path()).default.resolve(
  __dirname,
  '../assets/jest_logo.png'
);

class NotifyReporter extends (_base_reporter || _load_base_reporter()).default {
  constructor(globalConfig, startRun, context) {
    super();
    this._globalConfig = globalConfig;
    this._startRun = startRun;
    this._context = context;
  }

  onRunComplete(contexts, result) {
    const success =
      result.numFailedTests === 0 && result.numRuntimeErrorTestSuites === 0;

    const firstContext = contexts.values().next();

    const hasteFS =
      firstContext && firstContext.value && firstContext.value.hasteFS;

    let packageName;
    if (hasteFS != null) {
      // assuming root package.json is the first one
      var _hasteFS$matchFiles = hasteFS.matchFiles('package.json'),
        _hasteFS$matchFiles2 = _slicedToArray(_hasteFS$matchFiles, 1);

      const filePath = _hasteFS$matchFiles2[0];

      packageName =
        filePath != null
          ? hasteFS.getModuleName(filePath)
          : this._globalConfig.rootDir;
    } else {
      packageName = this._globalConfig.rootDir;
    }

    packageName = packageName != null ? `${packageName} - ` : '';

    const notifyMode = this._globalConfig.notifyMode;
    const statusChanged =
      this._context.previousSuccess !== success || this._context.firstRun;
    const testsHaveRun = result.numTotalTests !== 0;

    if (
      testsHaveRun &&
      success &&
      (notifyMode === 'always' ||
        notifyMode === 'success' ||
        notifyMode === 'success-change' ||
        (notifyMode === 'change' && statusChanged) ||
        (notifyMode === 'failure-change' && statusChanged))
    ) {
      const title = (_util || _load_util()).default.format(
        '%s%d%% Passed',
        packageName,
        100
      );
      const message = (_util || _load_util()).default.format(
        (isDarwin ? '\u2705 ' : '') + '%d tests passed',
        result.numPassedTests
      );

      (_nodeNotifier || _load_nodeNotifier()).default.notify({
        icon: icon,
        message: message,
        title: title
      });
    } else if (
      testsHaveRun &&
      !success &&
      (notifyMode === 'always' ||
        notifyMode === 'failure' ||
        notifyMode === 'failure-change' ||
        (notifyMode === 'change' && statusChanged) ||
        (notifyMode === 'success-change' && statusChanged))
    ) {
      const failed = result.numFailedTests / result.numTotalTests;

      const title = (_util || _load_util()).default.format(
        '%s%d%% Failed',
        packageName,
        Math.ceil(Number.isNaN(failed) ? 0 : failed * 100)
      );
      const message = (_util || _load_util()).default.format(
        (isDarwin ? '\u26D4\uFE0F ' : '') + '%d of %d tests failed',
        result.numFailedTests,
        result.numTotalTests
      );

      const watchMode = this._globalConfig.watch || this._globalConfig.watchAll;
      const restartAnswer = 'Run again';
      const quitAnswer = 'Exit tests';

      if (!watchMode) {
        (_nodeNotifier || _load_nodeNotifier()).default.notify({
          icon: icon,
          message: message,
          title: title
        });
      } else {
        (_nodeNotifier || _load_nodeNotifier()).default.notify(
          {
            actions: [restartAnswer, quitAnswer],
            closeLabel: 'Close',
            icon: icon,
            message: message,
            title: title
          },
          (err, _, metadata) => {
            if (err || !metadata) {
              return;
            }
            if (metadata.activationValue === quitAnswer) {
              (0, (_exit || _load_exit()).default)(0);
              return;
            }
            if (metadata.activationValue === restartAnswer) {
              this._startRun(this._globalConfig);
            }
          }
        );
      }
    }

    this._context.previousSuccess = success;
    this._context.firstRun = false;
  }
}
exports.default = NotifyReporter;
