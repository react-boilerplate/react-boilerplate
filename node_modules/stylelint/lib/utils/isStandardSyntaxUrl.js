/* @flow */
"use strict";

const hasLessInterpolation = require("../utils/hasLessInterpolation");
const hasPsvInterpolation = require("../utils/hasPsvInterpolation");
const hasScssInterpolation = require("../utils/hasScssInterpolation");
const hasTplInterpolation = require("../utils/hasTplInterpolation");

/**
 * Check whether a URL is standard
 */
module.exports = function(url /*: string*/) /*: boolean*/ {
  if (url.length === 0) {
    return true;
  }

  // Sass interpolation works anywhere
  if (
    hasScssInterpolation(url) ||
    hasTplInterpolation(url) ||
    hasPsvInterpolation(url)
  ) {
    return false;
  }

  // Inside `'` and `"` work only LESS interpolation
  if (
    (url[0] === "'" && url[url.length - 1] === "'") ||
    (url[0] === '"' && url[url.length - 1] === '"')
  ) {
    if (hasLessInterpolation(url)) {
      return false;
    }

    return true;
  }

  // Less variable works only at the beginning
  // Check is less variable, allow use '@url/some/path'
  // https://github.com/less/less.js/blob/3.x/lib/less/parser/parser.js#L547
  if (url[0] === "@" && /^@@?[\w-]+$/.test(url)) {
    return false;
  }

  // In url without quotes scss variable can be everywhere
  // But in this case it is allowed to use only specific characters
  // Also forbidden "/" at the end of url
  if (
    url.indexOf("$") !== -1 &&
    /^[$\sA-Za-z0-9+-/*_'"/]+$/.test(url) &&
    url[url.length - 1] !== "/"
  ) {
    return false;
  }

  return true;
};
