'use strict';

exports.__esModule = true;
exports.createMatchSelector = exports.getLocation = undefined;

var _reactRouter = require('react-router');

var getLocation = exports.getLocation = function getLocation(state) {
  return state.router.location;
};

var createMatchSelector = exports.createMatchSelector = function createMatchSelector(path) {
  var lastPathname = null;
  var lastMatch = null;
  return function (state) {
    var _ref = getLocation(state) || {},
        pathname = _ref.pathname;

    if (pathname === lastPathname) {
      return lastMatch;
    }
    lastPathname = pathname;
    var match = (0, _reactRouter.matchPath)(pathname, path);
    if (!match || !lastMatch || match.url !== lastMatch.url) {
      lastMatch = match;
    }
    return lastMatch;
  };
};