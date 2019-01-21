'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestWatcher;

function _load_jestWatcher() {
  return (_jestWatcher = require('jest-watcher'));
}

var _test_name_pattern_prompt;

function _load_test_name_pattern_prompt() {
  return (_test_name_pattern_prompt = _interopRequireDefault(
    require('../test_name_pattern_prompt')
  ));
}

var _active_filters_message;

function _load_active_filters_message() {
  return (_active_filters_message = _interopRequireDefault(
    require('../lib/active_filters_message')
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
class TestNamePatternPlugin extends (_jestWatcher || _load_jestWatcher())
  .BaseWatchPlugin {
  constructor(options) {
    super(options);
    this._prompt = new (_jestWatcher || _load_jestWatcher()).Prompt();
    this.isInternal = true;
  }

  getUsageInfo() {
    return {
      key: 't',
      prompt: 'filter by a test name regex pattern'
    };
  }

  onKey(key) {
    this._prompt.put(key);
  }

  run(globalConfig, updateConfigAndRun) {
    return new Promise((res, rej) => {
      const testNamePatternPrompt = new (
        _test_name_pattern_prompt || _load_test_name_pattern_prompt()
      ).default(this._stdout, this._prompt);

      testNamePatternPrompt.run(
        value => {
          updateConfigAndRun({mode: 'watch', testNamePattern: value});
          res();
        },
        rej,
        {
          header: (0,
          (_active_filters_message || _load_active_filters_message()).default)(
            globalConfig
          )
        }
      );
    });
  }
}

exports.default = TestNamePatternPlugin;
