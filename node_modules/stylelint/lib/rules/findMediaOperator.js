"use strict";

const rangeOperatorRegex = /[^><](>=?|<=?|=)/g;

module.exports = function(atRule, cb) {
  if (atRule.name.toLowerCase() !== "media") {
    return;
  }

  const params = atRule.params;
  let match;
  while ((match = rangeOperatorRegex.exec(params)) !== null) {
    cb(match, params, atRule);
  }
};
