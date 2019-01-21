'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _chalk;

function _load_chalk() {
  return (_chalk = _interopRequireDefault(require('chalk')));
}

var _jestWatcher;

function _load_jestWatcher() {
  return (_jestWatcher = require('jest-watcher'));
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

exports.default = function(pipe) {
  let stdin =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : process.stdin;

  return new Promise((resolve, reject) => {
    if (typeof stdin.setRawMode === 'function') {
      const messages = [
        (_chalk || _load_chalk()).default.red(
          'There are deprecation warnings.\n'
        ),
        (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
          'Enter' +
          (_chalk || _load_chalk()).default.dim(' to continue.'),
        (_chalk || _load_chalk()).default.dim(' \u203A Press ') +
          'Esc' +
          (_chalk || _load_chalk()).default.dim(' to exit.')
      ];

      pipe.write(messages.join('\n'));

      // $FlowFixMe
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      stdin.on('data', key => {
        if (key === (_jestWatcher || _load_jestWatcher()).KEYS.ENTER) {
          resolve();
        } else if (
          [
            (_jestWatcher || _load_jestWatcher()).KEYS.ESCAPE,
            (_jestWatcher || _load_jestWatcher()).KEYS.CONTROL_C,
            (_jestWatcher || _load_jestWatcher()).KEYS.CONTROL_D
          ].indexOf(key) !== -1
        ) {
          reject();
        }
      });
    } else {
      resolve();
    }
  });
};
