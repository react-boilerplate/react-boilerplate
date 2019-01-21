/* @flow */
"use strict";

const _ = require("lodash");
const keywordSets = require("../reference/keywordSets");

/**
 * Check value is a custom ident
 */

module.exports = function(value /*: string*/) /*: boolean*/ {
  const valueLowerCase = value.toLowerCase();

  if (
    keywordSets.counterIncrementKeywords.has(valueLowerCase) ||
    _.isFinite(parseInt(valueLowerCase))
  ) {
    return false;
  }

  return true;
};
