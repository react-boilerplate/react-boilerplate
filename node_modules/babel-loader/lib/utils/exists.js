"use strict";

module.exports = function (fileSystem, filename) {
  var exists = false;

  try {
    exists = fileSystem.statSync(filename).isFile();
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  return exists;
};