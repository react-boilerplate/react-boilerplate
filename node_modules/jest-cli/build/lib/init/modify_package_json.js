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

const modifyPackageJson = _ref => {
  let projectPackageJson = _ref.projectPackageJson,
    shouldModifyScripts = _ref.shouldModifyScripts,
    hasJestProperty = _ref.hasJestProperty;

  if (shouldModifyScripts) {
    projectPackageJson.scripts
      ? (projectPackageJson.scripts.test = 'jest')
      : (projectPackageJson.scripts = {test: 'jest'});
  }

  delete projectPackageJson.jest;

  return JSON.stringify(projectPackageJson, null, 2) + '\n';
};

exports.default = modifyPackageJson;
