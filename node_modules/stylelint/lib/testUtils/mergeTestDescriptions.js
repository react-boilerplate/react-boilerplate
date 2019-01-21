"use strict";

const _ = require("lodash");

module.exports = function() {
  const mergeWithArgs = [{}];
  Array.from(arguments).forEach(arg => mergeWithArgs.push(arg));
  mergeWithArgs.push(mergeCustomizer);

  return _.mergeWith.apply(_, mergeWithArgs);
};

function mergeCustomizer(objValue, srcValue) {
  if (_.isArray(objValue, mergeCustomizer)) {
    return objValue.concat(srcValue);
  }
}
