'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isDirty = require('../selectors/isDirty');

var _isDirty2 = _interopRequireDefault(_isDirty);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isDirty2.default)(_immutable2.default);