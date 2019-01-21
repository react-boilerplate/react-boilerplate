'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormMeta = require('../selectors/getFormMeta');

var _getFormMeta2 = _interopRequireDefault(_getFormMeta);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormMeta2.default)(_immutable2.default);