"use strict";

exports.__esModule = true;

// Helper to call a given function, only once
exports.default = function (cb) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      cb();
    }
  };
};

module.exports = exports["default"];