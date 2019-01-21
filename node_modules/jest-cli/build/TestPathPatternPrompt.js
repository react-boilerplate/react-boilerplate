'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jestWatcher;

function _load_jestWatcher() {
  return (_jestWatcher = require('jest-watcher'));
}

class TestPathPatternPrompt extends (_jestWatcher || _load_jestWatcher())
  .PatternPrompt {
  constructor(pipe, prompt) {
    super(pipe, prompt);
    this._entityName = 'filenames';
  }

  _onChange(pattern, options) {
    super._onChange(pattern, options);
    this._printPrompt(pattern, options);
  }

  _printPrompt(pattern, options) {
    const pipe = this._pipe;
    (0, (_jestWatcher || _load_jestWatcher()).printPatternCaret)(pattern, pipe);
    (0, (_jestWatcher || _load_jestWatcher()).printRestoredPatternCaret)(
      pattern,
      this._currentUsageRows,
      pipe
    );
  }

  _getMatchedTests(pattern) {
    let regex;

    try {
      regex = new RegExp(pattern, 'i');
    } catch (e) {}

    let tests = [];
    if (regex) {
      this._searchSources.forEach(_ref => {
        let searchSource = _ref.searchSource,
          context = _ref.context;

        tests = tests.concat(searchSource.findMatchingTests(pattern).tests);
      });
    }

    return tests;
  }

  updateSearchSources(searchSources) {
    this._searchSources = searchSources;
  }
}
exports.default = TestPathPatternPrompt;
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
