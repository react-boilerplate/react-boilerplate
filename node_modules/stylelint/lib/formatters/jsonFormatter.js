"use strict";

const _ = require("lodash");

// Omit any properties starting with `_`, which are fake-private
module.exports = function(results) {
  const cleanedResults = results.map(result => {
    return _.omitBy(result, (value, key) => key[0] === "_");
  });
  return JSON.stringify(cleanedResults);
};
