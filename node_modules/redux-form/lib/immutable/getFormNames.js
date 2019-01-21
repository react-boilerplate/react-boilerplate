'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormNames = require('../selectors/getFormNames');

var _getFormNames2 = _interopRequireDefault(_getFormNames);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormNames2.default)(_immutable2.default);