'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasSubmitSucceeded = require('../selectors/hasSubmitSucceeded');

var _hasSubmitSucceeded2 = _interopRequireDefault(_hasSubmitSucceeded);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _hasSubmitSucceeded2.default)(_immutable2.default);