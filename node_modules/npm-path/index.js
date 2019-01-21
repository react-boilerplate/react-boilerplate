'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');
var path = require('path');
var which = require('which');

var findPrefix = require('./find-prefix');

var PATH = getPATHKey();
var SEPARATOR = getPATHSeparator();

/**
 * Get new $PATH setting with additional paths supplied by the npm.
 *
 * @param Object options Config options Object.
 * @param Object options.env Environment to use. Default: process.env
 * @param String options.wd Working directory. Default: process.cwd()
 * @param Function fn callback function.
 */

function getPath(options, fn) {
  options.cwd = options.cwd || process.cwd();
  var env = options.env = options.env || process.env;
  var pathArr = getPathArr(options);

  findPrefix(options, function (err, prefixPath) {
    if (!err && prefixPath) {
      // ignore err if cannot find prefix
      pathArr.unshift(path.join(prefixPath, 'node_modules', '.bin'));
    }

    whichNpm(options, function (err, npmPath) {
      // we also unshift the bundled node-gyp-bin folder so that
      // the bundled one will be used for installing things.

      // simply ignore this step if there was no npm found
      if (err || !npmPath) {
        // ...unless npm path was explicitly passed in
        if (options.npm) {
          return fn(err || new Error('Cannot find ' + options.npm));
        }
      } else {
        pathArr.unshift(path.join(path.dirname(npmPath), 'node-gyp-bin'));
      }

      if (env[PATH]) pathArr = pathArr.concat(env[PATH].split(SEPARATOR));

      // Remove duplicated entries
      pathArr = [].concat(_toConsumableArray(new Set(pathArr)));

      fn(null, pathArr.join(SEPARATOR));
    });
  });
}

/**
 * Async wrapper around `getPath`.
 */

function getPathAsync(options, fn) {
  // options is optional
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }
  // if no fn, execute as sync
  if (typeof fn !== 'function') return getPathSync(options);
  options = options || {};
  options.isSync = false;
  return getPath(options, fn);
}

/**
 * Sync wrapper around `getPath`.
 */

function getPathSync(options) {
  options = options || {};
  options.isSync = true;
  var thePath = null;
  // sync magic: if sync true, callback is executed sync
  // therefore we can set thePath from inside it before returning
  getPath(options, function (err, foundPath) {
    if (err) throw err;
    thePath = foundPath;
  });
  return thePath;
}

/**
 * Change environment to include npm path adjustments.
 *
 * @param Object options Config options Object.
 * @param Object options.env Environment to use. Default: process.env
 * @param String options.wd Working directory. Default: process.cwd()
 * @param Function fn callback function.
 */

function setPathAsync(options, fn) {
  // options is optional
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  // if no fn, execute as sync
  if (typeof fn !== 'function') return setPathSync(options);

  getPathAsync(options, function (err, newPath) {
    if (err) return fn(err);
    fn(null, options.env[PATH] = newPath);
  });
}

/**
 * Sync version of `setPathAsync`
 */
function setPathSync(options) {
  options = options || {};
  var newPath = getPathSync(options);
  options.env[PATH] = newPath;
  return newPath;
}

/**
 * Generate simple parts of the npm path. Basically everything that doesn't
 * depend on potentially async operations.
 *
 * @return Array
 */
function getPathArr(options) {
  var wd = options.cwd;
  var pathArr = [];
  var p = wd.split(path.sep + 'node_modules' + path.sep);
  var acc = path.resolve(p.shift());

  // first add the directory containing the `node` executable currently
  // running, so that any lifecycle script that invoke 'node' will execute
  // this same one.
  pathArr.unshift(path.dirname(process.execPath));

  p.forEach(function (pp) {
    pathArr.unshift(path.join(acc, 'node_modules', '.bin'));
    acc = path.join(acc, 'node_modules', pp);
  });
  pathArr.unshift(path.join(acc, 'node_modules', '.bin'));
  return pathArr;
}

/**
 * Use callback-style signature but toggle sync execution if `isSync` is true.
 * If options.npm is supplied, this will simply provide npm/bin/npm-cli.
 */
function whichNpm(options, fn) {
  var npmCli = options.npm && path.join(options.npm, 'bin', 'npm-cli.js');

  if (options.isSync) {
    var npmPath = null;

    try {
      npmPath = fs.realpathSync(npmCli || which.sync('npm'));
    } catch (err) {
      return fn(err);
    }

    fn(null, npmPath);
    return;
  }

  if (options.npm) {
    fs.realpath(npmCli, fn);
    return;
  }

  which('npm', function (err, npmPath) {
    if (err) return fn(err);
    fs.realpath(npmPath, fn);
  });
}

/**
 * Get key to use as $PATH in environment
 */

function getPATHKey() {
  var PATH = 'PATH';

  // windows calls it's path 'Path' usually, but this is not guaranteed.
  if (process.platform === 'win32') {
    PATH = 'Path';
    Object.keys(process.env).forEach(function (e) {
      if (e.match(/^PATH$/i)) {
        PATH = e;
      }
    });
  }
  return PATH;
}

/**
 * Get $PATH separator based on environment
 */
function getPATHSeparator() {
  return process.platform === 'win32' ? ';' : ':';
}

module.exports = setPathAsync;
module.exports.get = getPathAsync;
module.exports.get.sync = getPathSync;
module.exports.getSync = getPathSync;

module.exports.set = setPathAsync;
module.exports.set.sync = setPathSync;
module.exports.setSync = setPathSync;

module.exports.PATH = PATH;
module.exports.SEPARATOR = SEPARATOR;