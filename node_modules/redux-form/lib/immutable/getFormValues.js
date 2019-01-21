'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormValues = require('../selectors/getFormValues');

var _getFormValues2 = _interopRequireDefault(_getFormValues);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormValues2.default)(_immutable2.default);