'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isValidPath;

var _jestSnapshot;

function _load_jestSnapshot() {
  return (_jestSnapshot = _interopRequireDefault(require('jest-snapshot')));
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

function isValidPath(globalConfig, config, filePath) {
  return (
    !filePath.includes(globalConfig.coverageDirectory) &&
    !config.watchPathIgnorePatterns.some(pattern => filePath.match(pattern)) &&
    !filePath.endsWith(
      `.${(_jestSnapshot || _load_jestSnapshot()).default.EXTENSION}`
    )
  );
}
