'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEqualWith2 = require('lodash/isEqualWith');

var _isEqualWith3 = _interopRequireDefault(_isEqualWith2);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customizer = function customizer(obj, other) {
  if (obj === other) return true;
  if (!obj && !other) {
    var objIsEmpty = obj === null || obj === undefined || obj === '';
    var otherIsEmpty = other === null || other === undefined || other === '';
    return objIsEmpty === otherIsEmpty;
  }

  if (_immutable.Iterable.isIterable(obj) && _immutable.Iterable.isIterable(other)) {
    return obj.count() === other.count() && obj.every(function (value, key) {
      return other.has(key) && (0, _isEqualWith3.default)(value, other.get(key), customizer);
    });
  }

  return void 0;
};


var deepEqual = function deepEqual(a, b) {
  return (0, _isEqualWith3.default)(a, b, customizer);
};

exports.default = deepEqual;