"use strict";

var path = require("path");
var exists = require("./utils/exists");

module.exports = function find(fileSystem, start) {
  var _arr = [".babelrc", "package.json"];

  for (var _i = 0; _i < _arr.length; _i++) {
    var fileName = _arr[_i];
    var file = path.join(start, fileName);

    if (exists(fileSystem, file)) {
      if (fileName !== "package.json" || typeof require(file).babel === "object") {
        return file;
      }
    }
  }

  var up = path.dirname(start);

  // Reached root
  if (up !== start) {
    return find(fileSystem, up);
  }
};