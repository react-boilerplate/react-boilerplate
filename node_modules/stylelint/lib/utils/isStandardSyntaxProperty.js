/* @flow */
"use strict";

const _ = require("lodash");
const hasInterpolation = require("../utils/hasInterpolation");
/**
 * Check whether a property is standard
 */
module.exports = function(property /*: string*/) /*: boolean*/ {
  // SCSS var (e.g. $var: x), list (e.g. $list: (x)) or map (e.g. $map: (key:value))
  if (property[0] === "$") {
    return false;
  }

  // Less var (e.g. @var: x)
  if (property[0] === "@") {
    return false;
  }

  // Less append property value with space (e.g. transform+_: scale(2))
  if (_.endsWith(property, "+") || _.endsWith(property, "+_")) {
    return false;
  }

  // SCSS or Less interpolation
  if (hasInterpolation(property)) {
    return false;
  }

  return true;
};
