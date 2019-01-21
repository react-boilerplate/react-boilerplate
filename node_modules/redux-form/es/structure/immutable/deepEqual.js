import _isEqualWith from 'lodash-es/isEqualWith';
import { Iterable } from 'immutable';

var customizer = function customizer(obj, other) {
  if (obj === other) return true;
  if (!obj && !other) {
    var objIsEmpty = obj === null || obj === undefined || obj === '';
    var otherIsEmpty = other === null || other === undefined || other === '';
    return objIsEmpty === otherIsEmpty;
  }

  if (Iterable.isIterable(obj) && Iterable.isIterable(other)) {
    return obj.count() === other.count() && obj.every(function (value, key) {
      return other.has(key) && _isEqualWith(value, other.get(key), customizer);
    });
  }

  return void 0;
};

var deepEqual = function deepEqual(a, b) {
  return _isEqualWith(a, b, customizer);
};

export default deepEqual;