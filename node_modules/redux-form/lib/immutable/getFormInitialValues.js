'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormInitialValues = require('../selectors/getFormInitialValues');

var _getFormInitialValues2 = _interopRequireDefault(_getFormInitialValues);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormInitialValues2.default)(_immutable2.default);