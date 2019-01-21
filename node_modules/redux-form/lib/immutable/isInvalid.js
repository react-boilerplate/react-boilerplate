'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isInvalid = require('../selectors/isInvalid');

var _isInvalid2 = _interopRequireDefault(_isInvalid);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isInvalid2.default)(_immutable2.default);