'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

class JestHooks {
  constructor() {
    this._listeners = {
      onFileChange: [],
      onTestRunComplete: [],
      shouldRunTestSuite: []
    };
  }

  isUsed(hook) {
    return this._listeners[hook] && this._listeners[hook].length;
  }

  getSubscriber() {
    return {
      onFileChange: fn => {
        this._listeners.onFileChange.push(fn);
      },
      onTestRunComplete: fn => {
        this._listeners.onTestRunComplete.push(fn);
      },
      shouldRunTestSuite: fn => {
        this._listeners.shouldRunTestSuite.push(fn);
      }
    };
  }

  getEmitter() {
    var _this = this;

    return {
      onFileChange: fs =>
        this._listeners.onFileChange.forEach(listener => listener(fs)),
      onTestRunComplete: results =>
        this._listeners.onTestRunComplete.forEach(listener =>
          listener(results)
        ),
      shouldRunTestSuite: (() => {
        var _ref = _asyncToGenerator(function*(testSuiteInfo) {
          return Promise.all(
            _this._listeners.shouldRunTestSuite.map(function(listener) {
              return listener(testSuiteInfo);
            })
          ).then(function(result) {
            return result.every(function(shouldRunTestSuite) {
              return shouldRunTestSuite;
            });
          });
        });

        return function shouldRunTestSuite(_x) {
          return _ref.apply(this, arguments);
        };
      })()
    };
  }
}

exports.default = JestHooks;
