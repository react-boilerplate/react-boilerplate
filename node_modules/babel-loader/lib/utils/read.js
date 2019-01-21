"use strict";

var path = require("path");

module.exports = function readBabelConfig(fileSystem, filename) {
  if (path.basename(filename) === "package.json") {
    var pkg = require(filename);

    return JSON.stringify(pkg.babel);
  }

  // Webpack `fs` return Buffer
  return fileSystem.readFileSync(filename).toString("utf8");
};