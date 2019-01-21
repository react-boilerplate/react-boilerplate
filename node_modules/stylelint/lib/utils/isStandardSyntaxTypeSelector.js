/* @flow */
"use strict";

/**
 * Check whether a type selector is standard
 *
 * @param {Node} postcss-selector-parser node (of type tag)
 * @return {boolean} If `true`, the type selector is standard
 */

const _ = require("lodash");
const keywordSets = require("../reference/keywordSets");

module.exports = function(node /*: Object*/) /*: boolean*/ {
  // postcss-selector-parser includes the arguments to nth-child() functions
  // as "tags", so we need to ignore them ourselves.
  // The fake-tag's "parent" is actually a selector node, whose parent
  // should be the :nth-child pseudo node.
  const _node$parent$parent = node.parent.parent;
  const parentType = _node$parent$parent.type;
  const parentValue = _node$parent$parent.value;

  if (parentValue) {
    const normalisedParentName = parentValue.toLowerCase().replace(/:+/, "");
    if (
      parentType === "pseudo" &&
      (keywordSets.aNPlusBNotationPseudoClasses.has(normalisedParentName) ||
        keywordSets.linguisticPseudoClasses.has(normalisedParentName))
    ) {
      return false;
    }
  }

  // &-bar is a nesting selector combined with a suffix
  if (node.prev() && node.prev().type === "nesting") {
    return false;
  }

  if (node.value[0] === "%") {
    return false;
  }

  // Reference combinators like `/deep/`
  if (_.startsWith(node.value, "/") && _.endsWith(node.value, "/")) {
    return false;
  }

  return true;
};
