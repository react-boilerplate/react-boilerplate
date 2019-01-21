'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasSubmitFailed = require('../selectors/hasSubmitFailed');

var _hasSubmitFailed2 = _interopRequireDefault(_hasSubmitFailed);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _hasSubmitFailed2.default)(_immutable2.default);