/* @flow */
"use strict";

const _ = require("lodash");
const formatters = require("../formatters");

module.exports = function getFormatterOptionsText(
  options /*: { useOr?: boolean }*/ = {}
) /*: string*/ {
  let output = _.chain(formatters)
    .keys()
    .map(name => `"${name}"`)
    .join(", ")
    .value();
  if (options.useOr) {
    output = output.replace(/, ([a-z"]+)$/u, " or $1");
  }
  return output;
};
