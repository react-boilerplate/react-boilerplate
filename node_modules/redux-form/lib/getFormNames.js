'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormNames = require('./selectors/getFormNames');

var _getFormNames2 = _interopRequireDefault(_getFormNames);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormNames2.default)(_plain2.default);