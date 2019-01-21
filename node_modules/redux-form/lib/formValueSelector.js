'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createFormValueSelector = require('./createFormValueSelector');

var _createFormValueSelector2 = _interopRequireDefault(_createFormValueSelector);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createFormValueSelector2.default)(_plain2.default);