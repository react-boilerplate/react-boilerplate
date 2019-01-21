/* @flow */
"use strict";

const _ = require("lodash");
const getPreviousNonSharedLineCommentNode = require("./getPreviousNonSharedLineCommentNode");
const isBlocklessAtRuleAfterBlocklessAtRule = require("./isBlocklessAtRuleAfterBlocklessAtRule");

module.exports = function(atRule /*: postcss$atRule*/) /*: boolean*/ {
  if (!isBlocklessAtRuleAfterBlocklessAtRule(atRule)) {
    return false;
  }

  const previousNode = getPreviousNonSharedLineCommentNode(atRule);

  return _.get(previousNode, "name") === atRule.name;
};
