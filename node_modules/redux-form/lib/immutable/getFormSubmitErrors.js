'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFormSubmitErrors = require('../selectors/getFormSubmitErrors');

var _getFormSubmitErrors2 = _interopRequireDefault(_getFormSubmitErrors);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _getFormSubmitErrors2.default)(_immutable2.default);