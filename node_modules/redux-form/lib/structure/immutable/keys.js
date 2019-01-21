'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _keys = require('../plain/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var empty = (0, _immutable.List)();

var keys = function keys(value) {
  if (_immutable.List.isList(value)) {
    return value.map(function (i) {
      return i.name;
    });
  }

  if (_immutable.Iterable.isIterable(value)) {
    return value.keySeq();
  }

  return value ? (0, _immutable.List)((0, _keys2.default)(value)) : empty;
};

exports.default = keys;