/* @flow */
"use strict";

module.exports = {
  compact: require("./compactFormatter"),
  json: require("./jsonFormatter"),
  string: require("./stringFormatter"),
  unix: require("./unixFormatter"),
  verbose: require("./verboseFormatter")
};
