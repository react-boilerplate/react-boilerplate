'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormSyncWarnings = require('../selectors/getFormSyncWarnings');

var _getFormSyncWarnings2 = _interopRequireDefault(_getFormSyncWarnings);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormSyncWarnings2.default)(_immutable2.default);