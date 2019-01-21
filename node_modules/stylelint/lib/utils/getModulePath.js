/* @flow */
"use strict";

const configurationError = require("./configurationError");
const resolveFrom = require("resolve-from");

module.exports = function(
  basedir /*: string*/,
  lookup /*: string*/
) /*: string*/ {
  // First try to resolve from the provided directory,
  // then try to resolve from process.cwd.
  let path = resolveFrom.silent(basedir, lookup);
  if (!path) {
    path = resolveFrom.silent(process.cwd(), lookup);
  }
  if (!path) {
    throw configurationError(
      `Could not find "${lookup}". Do you need a \`configBasedir\`?`
    );
  }
  return path;
};
