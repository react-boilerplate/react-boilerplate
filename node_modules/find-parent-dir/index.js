'use strict';

var path       = require('path')
  , fs         = require('fs')
  , exists     = fs.exists || path.exists
  , existsSync = fs.existsSync || path.existsSync
  ;

function splitPath(path) {
  var parts = path.split(/(\/|\\)/);
  if (!parts.length) return parts;

  // when path starts with a slash, the first part is empty string
  return !parts[0].length ? parts.slice(1) : parts;
}

exports = module.exports = function (currentFullPath, clue, cb) {

  function testDir(parts) {
    if (parts.length === 0) return cb(null, null);

    var p = parts.join('');

    exists(path.join(p, clue), function (itdoes) {
      if (itdoes) return cb(null, p);
      testDir(parts.slice(0, -1));
    });
  }

  testDir(splitPath(currentFullPath));
}

exports.sync = function (currentFullPath, clue) {

  function testDir(parts) {
    if (parts.length === 0) return null;

    var p = parts.join('');

    var itdoes = existsSync(path.join(p, clue));
    return itdoes ? p : testDir(parts.slice(0, -1));
  }

  return testDir(splitPath(currentFullPath));
}
