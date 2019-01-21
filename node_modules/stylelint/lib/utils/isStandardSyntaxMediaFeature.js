/* @flow */
"use strict";

const hasInterpolation = require("../utils/hasInterpolation");
/**
 * Check whether a media feature is standard
 */
module.exports = function(mediaFeature /*: string*/) /*: boolean*/ {
  // Remove outside parens
  mediaFeature = mediaFeature.slice(1, -1);

  // Parentheticals used for non-standard operations e.g. ($var - 10)
  if (mediaFeature.indexOf("(") !== -1) {
    return false;
  }

  // SCSS or Less interpolation
  if (hasInterpolation(mediaFeature)) {
    return false;
  }

  return true;
};
