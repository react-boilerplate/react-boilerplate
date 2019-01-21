'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormError = require('./selectors/getFormError');

var _getFormError2 = _interopRequireDefault(_getFormError);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormError2.default)(_plain2.default);