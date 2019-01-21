/* @flow */
"use strict";

const selectorParser = require("postcss-selector-parser");

module.exports = function(
  selector /*: string*/,
  result /*: Object*/,
  node /*: Object*/,
  cb /*: Function*/
) {
  try {
    selectorParser(cb).processSync(selector);
  } catch (e) {
    result.warn("Cannot parse selector", { node, stylelintType: "parseError" });
  }
};
