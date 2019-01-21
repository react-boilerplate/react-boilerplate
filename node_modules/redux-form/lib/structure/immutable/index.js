'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toPath2 = require('lodash/toPath');

var _toPath3 = _interopRequireDefault(_toPath2);

var _immutable = require('immutable');

var _deepEqual = require('./deepEqual');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _setIn = require('./setIn');

var _setIn2 = _interopRequireDefault(_setIn);

var _splice = require('./splice');

var _splice2 = _interopRequireDefault(_splice);

var _getIn = require('../plain/getIn');

var _getIn2 = _interopRequireDefault(_getIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyList = (0, _immutable.List)();

var structure = {
  allowsArrayErrors: false,
  empty: (0, _immutable.Map)(),
  emptyList: emptyList,
  getIn: function getIn(state, field) {
    return _immutable.Iterable.isIterable(state) ? state.getIn((0, _toPath3.default)(field)) : (0, _getIn2.default)(state, field);
  },
  setIn: _setIn2.default,
  deepEqual: _deepEqual2.default,
  deleteIn: function deleteIn(state, field) {
    return state.deleteIn((0, _toPath3.default)(field));
  },
  forEach: function forEach(items, callback) {
    items.forEach(callback);
  },
  fromJS: function fromJS(jsValue) {
    return (0, _immutable.fromJS)(jsValue, function (key, value) {
      return _immutable.Iterable.isIndexed(value) ? value.toList() : value.toMap();
    });
  },
  keys: _keys2.default,
  size: function size(list) {
    return list ? list.size : 0;
  },
  some: function some(items, callback) {
    return items.some(callback);
  },
  splice: _splice2.default,
  toJS: function toJS(value) {
    return _immutable.Iterable.isIterable(value) ? value.toJS() : value;
  }
};

exports.default = structure;