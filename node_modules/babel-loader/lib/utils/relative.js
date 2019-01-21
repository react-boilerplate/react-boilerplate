"use strict";

var path = require("path");

module.exports = function relative(sourceRoot, filename) {
  var rootPath = sourceRoot.replace(/\\/g, "/").split("/")[1];
  var fileRootPath = filename.replace(/\\/g, "/").split("/")[1];

  // If the file is in a completely different root folder use the absolute path of file.
  if (rootPath && rootPath !== fileRootPath) {
    return filename;
  }

  return path.relative(sourceRoot, filename);
};