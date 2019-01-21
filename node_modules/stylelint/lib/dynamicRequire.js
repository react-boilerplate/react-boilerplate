"use strict";
// This file exists to remove the need for Flow's ignore_non_literal_requires option

module.exports = function(name) {
  return require(name);
};
