/* @flow */
"use strict";
const _ = require("lodash");
const augmentConfig = require("./augmentConfig");
const cosmiconfig = require("cosmiconfig");
const createStylelintResult = require("./createStylelintResult");
const getConfigForFile = require("./getConfigForFile");
const getPostcssResult = require("./getPostcssResult");
const isPathIgnored = require("./isPathIgnored");
const lintSource = require("./lintSource");
const path = require("path");

const IS_TEST = process.env.NODE_ENV === "test";
const STOP_DIR = IS_TEST ? path.resolve(__dirname, "..") : undefined;

// The stylelint "internal API" is passed among functions
// so that methods on a stylelint instance can invoke
// each other while sharing options and caches
module.exports = function(
  options /*: stylelint$options*/
) /*: stylelint$internalApi*/ {
  options = options || {};
  const stylelint /*: Object*/ = { _options: options };

  // Two separate explorers so they can each have their own transform
  // function whose results are cached by cosmiconfig
  stylelint._fullExplorer = cosmiconfig("stylelint", {
    transform: _.partial(augmentConfig.augmentConfigFull, stylelint),
    stopDir: STOP_DIR
  });
  stylelint._extendExplorer = cosmiconfig(null, {
    transform: _.partial(augmentConfig.augmentConfigExtended, stylelint),
    stopDir: STOP_DIR
  });

  stylelint._specifiedConfigCache = new Map();
  stylelint._postcssResultCache = new Map();
  stylelint._createStylelintResult = _.partial(
    createStylelintResult,
    stylelint
  );
  stylelint._getPostcssResult = _.partial(getPostcssResult, stylelint);
  stylelint._lintSource = _.partial(lintSource, stylelint);

  stylelint.getConfigForFile = _.partial(getConfigForFile, stylelint);
  stylelint.isPathIgnored = _.partial(isPathIgnored, stylelint);

  return stylelint;
};
