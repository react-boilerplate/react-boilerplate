'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (input) {
  return _crypto2.default.createHash('md5').update(input).digest('hex');
};

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }