/* @flow */
"use strict";

const keywordSets = require("../reference/keywordSets");

/**
 * Check whether a string is a keyframe selector.
 */
module.exports = function(selector /*: string*/) /*: boolean*/ {
  if (keywordSets.keyframeSelectorKeywords.has(selector)) {
    return true;
  }

  // Percentages
  if (/^(?:\d+\.?\d*|\d*\.?\d+)%$/.test(selector)) {
    return true;
  }

  return false;
};
