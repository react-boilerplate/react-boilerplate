/* @flow */
"use strict";

module.exports = function(ruleName /*: string*/, rule /*: Function*/) {
  return {
    ruleName,
    rule
  };
};
