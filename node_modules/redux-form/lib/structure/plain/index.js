'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _splice = require('./splice');

var _splice2 = _interopRequireDefault(_splice);

var _getIn = require('./getIn');

var _getIn2 = _interopRequireDefault(_getIn);

var _setIn = require('./setIn');

var _setIn2 = _interopRequireDefault(_setIn);

var _deepEqual = require('./deepEqual');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _deleteIn = require('./deleteIn');

var _deleteIn2 = _interopRequireDefault(_deleteIn);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var structure = {
  allowsArrayErrors: true,
  empty: {},
  emptyList: [],
  getIn: _getIn2.default,
  setIn: _setIn2.default,
  deepEqual: _deepEqual2.default,
  deleteIn: _deleteIn2.default,
  forEach: function forEach(items, callback) {
    return items.forEach(callback);
  },
  fromJS: function fromJS(value) {
    return value;
  },
  keys: _keys2.default,
  size: function size(array) {
    return array ? array.length : 0;
  },
  some: function some(items, callback) {
    return items.some(callback);
  },
  splice: _splice2.default,
  toJS: function toJS(value) {
    return value;
  }
};

exports.default = structure;