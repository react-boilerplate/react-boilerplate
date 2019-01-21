'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestWatcher;

function _load_jestWatcher() {
  return (_jestWatcher = require('jest-watcher'));
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
} /**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

class QuitPlugin extends (_jestWatcher || _load_jestWatcher()).BaseWatchPlugin {
  constructor(options) {
    super(options);
    this.isInternal = true;
  }

  run() {
    var _this = this;

    return _asyncToGenerator(function*() {
      if (typeof _this._stdin.setRawMode === 'function') {
        _this._stdin.setRawMode(false);
      }
      _this._stdout.write('\n');
      process.exit(0);
    })();
  }

  getUsageInfo() {
    return {
      key: 'q',
      prompt: 'quit watch mode'
    };
  }
}

exports.default = QuitPlugin;
