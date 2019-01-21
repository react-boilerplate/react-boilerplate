"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var normalizeHandlers = function normalizeHandlers(handlers) {
  return (0, _isArray2.default)(handlers) ? handlers : [handlers];
};

var _default = normalizeHandlers;
exports.default = _default;