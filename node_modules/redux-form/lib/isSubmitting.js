'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSubmitting = require('./selectors/isSubmitting');

var _isSubmitting2 = _interopRequireDefault(_isSubmitting);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isSubmitting2.default)(_plain2.default);