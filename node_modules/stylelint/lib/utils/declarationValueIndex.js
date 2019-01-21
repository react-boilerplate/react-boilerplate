/* @flow */
"use strict";
const _ = require("lodash");

/**
 * Get the index of a declaration's value
 */
module.exports = function(decl /*: Object*/) /*: number*/ {
  return [
    _.get(decl, "raws.prop.prefix"),
    _.get(decl, "raws.prop.raw", decl.prop),
    _.get(decl, "raws.prop.suffix"),
    _.get(decl, "raws.between", ":"),
    _.get(decl, "raws.value.prefix")
  ].reduce((count, str) => (str ? count + str.length : count), 0);
};
