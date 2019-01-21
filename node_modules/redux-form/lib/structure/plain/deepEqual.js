'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEqualWith2 = require('lodash/isEqualWith');

var _isEqualWith3 = _interopRequireDefault(_isEqualWith2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customizer = function customizer(obj, other) {
  if (obj === other) return true;

  if (!obj && !other) {
    var objIsEmpty = obj === null || obj === undefined || obj === '';
    var otherIsEmpty = other === null || other === undefined || other === '';
    return objIsEmpty === otherIsEmpty;
  }

  if (obj && other && obj._error !== other._error) return false;
  if (obj && other && obj._warning !== other._warning) return false;
  if (_react2.default.isValidElement(obj) || _react2.default.isValidElement(other)) return false;
};


var deepEqual = function deepEqual(a, b) {
  return (0, _isEqualWith3.default)(a, b, customizer);
};

exports.default = deepEqual;