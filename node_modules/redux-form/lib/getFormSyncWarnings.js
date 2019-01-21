'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormSyncWarnings = require('./selectors/getFormSyncWarnings');

var _getFormSyncWarnings2 = _interopRequireDefault(_getFormSyncWarnings);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormSyncWarnings2.default)(_plain2.default);