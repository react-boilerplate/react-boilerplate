'use strict';

const fs = require('fs');
const promisify = require('util.promisify');

function realpath(filepath) {
  if (typeof fs.realpath.native === 'function') {
    return promisify(fs.realpath.native)(filepath);
  }

  return new Promise((resolve, reject) => {
    try {
      resolve(process.binding('fs').realpath(filepath, 'utf8'));
    } catch (e) {
      reject(e);
    }
  });
}

function realpathSync(filepath) {
  if (typeof fs.realpathSync.native === 'function') {
    return fs.realpathSync.native(filepath);
  }

  return process.binding('fs').realpath(filepath, 'utf8');
}

module.exports = realpath;
module.exports.sync = realpathSync;
