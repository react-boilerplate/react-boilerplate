/* @flow */
"use strict";

/**
 * Check whether a media query is a custom
 */
module.exports = function(mediaQuery /*: string*/) /*: boolean*/ {
  return mediaQuery.slice(0, 2) === "--";
};
