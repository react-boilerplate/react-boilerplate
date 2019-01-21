"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _difference2 = _interopRequireDefault(require("lodash/difference"));

var computeClassNamesDifference = function computeClassNamesDifference(prevClassNames, currentClassNames) {
  return [(0, _difference2.default)(currentClassNames, prevClassNames), (0, _difference2.default)(prevClassNames, currentClassNames)];
};

var _default = computeClassNamesDifference;
exports.default = _default;