/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

module.exports = function(fp, stripTrailing) {
  fp = fp.replace(/[\\\/]+/g, '/');
  if (stripTrailing === false) {
    return fp;
  }

  return fp.slice(-1) === '/'
    ? fp.slice(0, fp.length -1)
    : fp;
};
