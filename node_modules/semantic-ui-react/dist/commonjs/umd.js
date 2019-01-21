"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var semanticUIReact = _interopRequireWildcard(require("./index"));

// Heads Up!
//
// Do not replace this with named exports.
// We need to export an object here for browser builds.
// Otherwise, we end up with every component on the window.
module.exports = (0, _objectSpread2.default)({}, semanticUIReact);