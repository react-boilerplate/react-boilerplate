'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isInvalid = require('./selectors/isInvalid');

var _isInvalid2 = _interopRequireDefault(_isInvalid);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isInvalid2.default)(_plain2.default);