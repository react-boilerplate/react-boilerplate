/* @flow */
"use strict";

/**
 * Check whether a property is a custom one
 */
module.exports = function(property /*: string*/) /*: boolean*/ {
  return property.slice(0, 2) === "--";
};
