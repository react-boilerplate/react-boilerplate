/* @flow */
"use strict";

const matchesStringOrRegExp = require("./matchesStringOrRegExp");

/**
 * Check if an options object's propertyName contains a user-defined string or
 * regex that matches the passed in input.
 */
module.exports = function optionsMatches(
  options /*: Object*/,
  propertyName /*: string*/,
  input /*: string*/
) /*: boolean*/ {
  return !!(
    options &&
    options[propertyName] &&
    typeof input === "string" &&
    matchesStringOrRegExp(input, options[propertyName])
  );
};
