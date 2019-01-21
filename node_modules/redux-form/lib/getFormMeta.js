'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormMeta = require('./selectors/getFormMeta');

var _getFormMeta2 = _interopRequireDefault(_getFormMeta);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormMeta2.default)(_plain2.default);