'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEqualWith2 = require('lodash/isEqualWith');

var _isEqualWith3 = _interopRequireDefault(_isEqualWith2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customizer = function customizer(objectValue, otherValue, indexOrkey, object, other, stack) {
  // https://lodash.com/docs/4.17.4#isEqualWith
  if (stack) {
    // Shallow compares
    // For 1st level, stack === undefined.
    //   -> Do nothing (and implicitly return undefined so that it goes to compare 2nd level)
    // For 2nd level and up, stack !== undefined.
    //   -> Compare by === operator
    return objectValue === otherValue;
  }
};

var shallowCompare = function shallowCompare(instance, nextProps, nextState) {
  var propsEqual = (0, _isEqualWith3.default)(instance.props, nextProps, customizer);
  var stateEqual = (0, _isEqualWith3.default)(instance.state, nextState, customizer);

  return !propsEqual || !stateEqual;
};

exports.default = shallowCompare;