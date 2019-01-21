'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormError = require('../selectors/getFormError');

var _getFormError2 = _interopRequireDefault(_getFormError);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormError2.default)(_immutable2.default);