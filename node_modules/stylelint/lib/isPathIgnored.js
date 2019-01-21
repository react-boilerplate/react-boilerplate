/* @flow */
"use strict";
const micromatch = require("micromatch");
const path = require("path");

// To find out if a path is ignored, we need to load the config,
// which may have an ignoreFiles property. We then check the path
// against these.
module.exports = function(
  stylelint /*: stylelint$internalApi*/,
  filePathArg /*:: ?: string*/
) /*: Promise<boolean>*/ {
  const filePath = filePathArg; // to please Flow
  if (!filePath) {
    return Promise.resolve(false);
  }

  return stylelint.getConfigForFile(filePath).then(result => {
    const config = result.config;
    const absoluteFilePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    if (micromatch(absoluteFilePath, config.ignoreFiles).length) {
      return true;
    }
    return false;
  });
};
