/* @flow */
"use strict";

/**
 * Checks if a string contains a value. The comparison value can be a string or
 * an array of strings.
 *
 * Any strings starting and ending with `/` are ignored. Use the
 * matchesStringOrRegExp() util to match regexes.
 */
module.exports = function containsString(
  input /*: string*/,
  comparison /*: string | Array<string>*/
) /*: false | { match: string, pattern: string }*/ {
  if (!Array.isArray(comparison)) {
    return testAgainstString(input, comparison);
  }

  for (const comparisonItem of comparison) {
    const testResult = testAgainstString(input, comparisonItem);
    if (testResult) {
      return testResult;
    }
  }
  return false;
};

function testAgainstString(value, comparison) {
  if (!comparison) return false;
  if (comparison[0] === "/" && comparison[comparison.length - 1] === "/") {
    return false;
  }

  if (value.indexOf(comparison) >= 0) {
    return { match: value, pattern: comparison };
  }

  return false;
}
