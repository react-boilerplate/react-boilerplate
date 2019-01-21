'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const isWindows = process.platform === 'win32';

const CLEAR = (exports.CLEAR = isWindows
  ? '\x1B[2J\x1B[0f'
  : '\x1B[2J\x1B[3J\x1B[H');
const ARROW = (exports.ARROW = ' \u203A ');
const ICONS = (exports.ICONS = {
  failed: isWindows ? '\u00D7' : '\u2715',
  pending: '\u25CB',
  success: isWindows ? '\u221A' : '\u2713'
});
const PACKAGE_JSON = (exports.PACKAGE_JSON = 'package.json');
const JEST_CONFIG = (exports.JEST_CONFIG = 'jest.config.js');
