"use strict";

const _ = require("lodash");

const formatter = results =>
  _.flatMap(results, result =>
    _.map(
      result.warnings,
      warning =>
        `${result.source}: ` +
        `line ${warning.line}, ` +
        `col ${warning.column}, ` +
        `${warning.severity} - ` +
        `${warning.text}`
    )
  ).join("\n");

module.exports = formatter;
