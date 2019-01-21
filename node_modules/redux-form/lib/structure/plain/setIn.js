'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toPath2 = require('lodash/toPath');

var _toPath3 = _interopRequireDefault(_toPath2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setInWithPath = function setInWithPath(state, value, path, pathIndex) {
  if (pathIndex >= path.length) {
    return value;
  }

  var first = path[pathIndex];
  var firstState = state && (Array.isArray(state) ? state[Number(first)] : state[first]);
  var next = setInWithPath(firstState, value, path, pathIndex + 1);

  if (!state) {
    if (isNaN(first)) {
      return _defineProperty({}, first, next);
    }
    var initialized = [];
    initialized[parseInt(first, 10)] = next;
    return initialized;
  }

  if (Array.isArray(state)) {
    var copy = [].concat(state);
    copy[parseInt(first, 10)] = next;
    return copy;
  }

  return _extends({}, state, _defineProperty({}, first, next));
};

var setIn = function setIn(state, field, value) {
  return setInWithPath(state, value, (0, _toPath3.default)(field), 0);
};

exports.default = setIn;