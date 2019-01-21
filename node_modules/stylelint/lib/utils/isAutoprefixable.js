/* @flow */
"use strict";

const autoprefixer = require("autoprefixer");
const Browsers = require("autoprefixer/lib/browsers");
const Prefixes = require("autoprefixer/lib/prefixes");

/**
 * Use Autoprefixer's secret powers to determine whether or
 * not a certain CSS identifier contains a vendor prefix that
 * Autoprefixer, given the standardized identifier, could add itself.
 *
 * Used by `*-no-vendor-prefix-*` rules to find superfluous
 * vendor prefixes.
 */

const prefixes = new Prefixes(
  autoprefixer.data.prefixes,
  new Browsers(autoprefixer.data.browsers, [])
);

/**
 * Most identifier types have to be looked up in a unique way,
 * so we're exposing special functions for each.
 */
module.exports = {
  atRuleName(identifier /*: string*/) /*: boolean*/ {
    return prefixes.remove[`@${identifier.toLowerCase()}`];
  },

  selector(identifier /*: string*/) /*: boolean*/ {
    return prefixes.remove.selectors.some(selectorObj => {
      return identifier.toLowerCase() === selectorObj.prefixed;
    });
  },

  mediaFeatureName(identifier /*: string*/) /*: boolean*/ {
    return identifier.toLowerCase().indexOf("device-pixel-ratio") !== -1;
  },

  property(identifier /*: string*/) /*: boolean*/ {
    return autoprefixer.data.prefixes[
      prefixes.unprefixed(identifier.toLowerCase())
    ];
  },

  propertyValue(prop /*: string*/, value /*: string*/) /*: boolean*/ {
    const possiblePrefixableValues =
      prefixes.remove[prop.toLowerCase()] &&
      prefixes.remove[prop.toLowerCase()].values;
    return (
      possiblePrefixableValues &&
      possiblePrefixableValues.some(valueObj => {
        return value.toLowerCase() === valueObj.prefixed;
      })
    );
  }
};
