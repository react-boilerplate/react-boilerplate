'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = nodeModulesPaths;

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

var _realpathNative;

function _load_realpathNative() {
  return (_realpathNative = require('realpath-native'));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function nodeModulesPaths(basedir, options) {
  const modules =
    options && options.moduleDirectory
      ? [].concat(options.moduleDirectory)
      : ['node_modules'];

  // ensure that `basedir` is an absolute path at this point,
  // resolving against the process' current working directory
  const basedirAbs = (_path || _load_path()).default.resolve(basedir);

  let prefix = '/';
  if (/^([A-Za-z]:)/.test(basedirAbs)) {
    prefix = '';
  } else if (/^\\\\/.test(basedirAbs)) {
    prefix = '\\\\';
  }

  // The node resolution algorithm (as implemented by NodeJS and TypeScript)
  // traverses parents of the physical path, not the symlinked path
  let physicalBasedir;
  try {
    physicalBasedir = (0, (_realpathNative || _load_realpathNative()).sync)(
      basedirAbs
    );
  } catch (err) {
    // realpath can throw, e.g. on mapped drives
    physicalBasedir = basedirAbs;
  }

  const paths = [physicalBasedir];
  let parsed = (_path || _load_path()).default.parse(physicalBasedir);
  while (parsed.dir !== paths[paths.length - 1]) {
    paths.push(parsed.dir);
    parsed = (_path || _load_path()).default.parse(parsed.dir);
  }

  const dirs = paths
    .reduce(
      (dirs, aPath) =>
        dirs.concat(
          modules.map(
            moduleDir =>
              (_path || _load_path()).default.isAbsolute(moduleDir)
                ? aPath === basedirAbs
                  ? moduleDir
                  : ''
                : (_path || _load_path()).default.join(prefix, aPath, moduleDir)
          )
        ),
      []
    )
    .filter(dir => dir !== '');

  return options.paths ? dirs.concat(options.paths) : dirs;
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Adapted from: https://github.com/substack/node-resolve
 *
 *
 */
