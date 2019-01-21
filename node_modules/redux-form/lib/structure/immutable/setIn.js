'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toPath2 = require('lodash/toPath');

var _toPath3 = _interopRequireDefault(_toPath2);

exports.default = setIn;

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrayPattern = /\[(\d+)\]/;


var undefinedArrayMerge = function undefinedArrayMerge(previous, next) {
  return next !== undefined ? next : previous;
};

var mergeLists = function mergeLists(originalList, value) {
  if (originalList && _immutable.List.isList(originalList)) {
    return originalList.map(function (originalListValue, index) {
      return undefinedArrayMerge(value.get(index), originalListValue);
    }).concat(value.slice(originalList.size));
  }

  return value;
};

var assureComplexProps = function assureComplexProps(state, path) {
  for (var pathPart = 1; pathPart < path.length; ++pathPart) {
    var nextPart = path.slice(0, pathPart);
    if (state.getIn(nextPart) == null) {
      return state.setIn(nextPart, new _immutable.Map());
    }
  }
  return state;
};
/*
 * ImmutableJS' setIn function doesn't support array (List) creation
 * so we must pre-insert all arrays in the path ahead of time.
 * 
 * Additionally we must also pre-set a dummy Map at the location
 * of an array index if there's parts that come afterwards because 
 * the setIn function uses `{}` to mark an unset value instead of 
 * undefined (which is the case for list / arrays).
 */
function setIn(state, field, value) {
  var path = (0, _toPath3.default)(field);

  if (!field || typeof field !== 'string' || !arrayPattern.test(field)) {
    var newState = assureComplexProps(state, path);
    return newState.setIn(path, value);
  }

  return state.withMutations(function (mutable) {
    var _loop = function _loop(pathIndex) {
      var nextPart = path[pathIndex + 1];
      if (isNaN(nextPart)) {
        return 'continue';
      }

      mutable = mutable.updateIn(path.slice(0, pathIndex + 1), function (value) {
        return mergeLists(value, new _immutable.List().set(parseInt(nextPart, 10), new _immutable.Map()));
      });
    };

    for (var pathIndex = 0; pathIndex < path.length - 1; ++pathIndex) {
      var _ret = _loop(pathIndex);

      if (_ret === 'continue') continue;
    }

    return mutable.setIn(path, value);
  });
}