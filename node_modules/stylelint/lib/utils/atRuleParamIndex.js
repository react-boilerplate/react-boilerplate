/* @flow */
"use strict";
module.exports = function(atRule /*: postcss$atRule*/) /*: number*/ {
  // Initial 1 is for the `@`
  let index = 1 + atRule.name.length;
  if (atRule.raws.afterName) {
    index += atRule.raws.afterName.length;
  }
  return index;
};
