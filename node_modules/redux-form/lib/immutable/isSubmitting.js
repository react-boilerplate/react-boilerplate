'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSubmitting = require('../selectors/isSubmitting');

var _isSubmitting2 = _interopRequireDefault(_isSubmitting);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isSubmitting2.default)(_immutable2.default);