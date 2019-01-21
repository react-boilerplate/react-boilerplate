'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReducer2.default)(_plain2.default);