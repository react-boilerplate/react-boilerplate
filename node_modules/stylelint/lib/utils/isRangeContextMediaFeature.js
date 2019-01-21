/* @flow */
"use strict";

/**
 * Check whether a media feature is a range context one
 *
 * @param {string} media feature
 * @return {boolean} If `true`, media feature is a range context one
 */
module.exports = function(mediaFeature /*: string*/) /*: boolean*/ {
  return (
    mediaFeature.indexOf("=") !== -1 ||
    mediaFeature.indexOf("<") !== -1 ||
    mediaFeature.indexOf(">") !== -1
  );
};
