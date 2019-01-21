'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormSyncErrors = require('../selectors/getFormSyncErrors');

var _getFormSyncErrors2 = _interopRequireDefault(_getFormSyncErrors);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormSyncErrors2.default)(_immutable2.default);