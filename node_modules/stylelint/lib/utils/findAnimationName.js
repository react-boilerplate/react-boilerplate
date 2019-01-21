/* @flow */
"use strict";

const getUnitFromValueNode = require("./getUnitFromValueNode");
const isStandardSyntaxValue = require("./isStandardSyntaxValue");
const isVariable = require("./isVariable");
const keywordSets = require("../reference/keywordSets");
const postcssValueParser = require("postcss-value-parser");

/**
 * Get the font-families within a `font` shorthand property value.
 */
module.exports = function findAnimationName(
  value /*: string*/
) /*: Array<Object>*/ {
  const animationNames = [];

  const valueNodes = postcssValueParser(value);

  // Handle `inherit`, `initial` and etc
  if (
    valueNodes.nodes.length === 1 &&
    keywordSets.basicKeywords.has(valueNodes.nodes[0].value.toLowerCase())
  ) {
    return [valueNodes.nodes[0]];
  }

  valueNodes.walk(valueNode => {
    if (valueNode.type === "function") {
      return false;
    }
    if (valueNode.type !== "word") {
      return;
    }

    const valueLowerCase = valueNode.value.toLowerCase();

    // Ignore non standard syntax
    if (!isStandardSyntaxValue(valueLowerCase)) {
      return;
    }
    // Ignore variables
    if (isVariable(valueLowerCase)) {
      return;
    }
    // Ignore keywords for other font parts
    if (keywordSets.animationShorthandKeywords.has(valueLowerCase)) {
      return;
    }
    // Ignore numbers with units
    const unit = getUnitFromValueNode(valueNode);
    if (unit || unit === "") {
      return;
    }

    animationNames.push(valueNode);
  });

  return animationNames;
};
