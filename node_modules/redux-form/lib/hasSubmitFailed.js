'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasSubmitFailed = require('./selectors/hasSubmitFailed');

var _hasSubmitFailed2 = _interopRequireDefault(_hasSubmitFailed);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _hasSubmitFailed2.default)(_plain2.default);