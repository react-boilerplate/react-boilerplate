"use strict";

exports.__esModule = true;
exports.prettifyTargets = exports.prettifyVersion = exports.semverify = exports._extends = undefined;

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = exports._extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// Convert version to a semver value.
// 2.5 -> 2.5.0; 1 -> 1.0.0;
// @flow
var semverify = exports.semverify = function semverify(version) {
  if (typeof version === "string" && _semver2.default.valid(version)) {
    return version;
  }

  var split = version.toString().split(".");

  while (split.length < 3) {
    split.push(0);
  }

  return split.join(".");
};

var prettifyVersion = exports.prettifyVersion = function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }

  var parts = [_semver2.default.major(version)];
  var minor = _semver2.default.minor(version);
  var patch = _semver2.default.patch(version);

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
};

var prettifyTargets = exports.prettifyTargets = function prettifyTargets() {
  var targets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(targets).reduce(function (results, target) {
    var value = targets[target];

    if (typeof value === "string") {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
};