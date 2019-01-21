'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormSyncErrors = require('./selectors/getFormSyncErrors');

var _getFormSyncErrors2 = _interopRequireDefault(_getFormSyncErrors);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormSyncErrors2.default)(_plain2.default);