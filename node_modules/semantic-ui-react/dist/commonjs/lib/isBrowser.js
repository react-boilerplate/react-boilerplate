"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var hasDocument = (typeof document === "undefined" ? "undefined" : (0, _typeof2.default)(document)) === 'object' && document !== null;
var hasWindow = (typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) === 'object' && window !== null && window.self === window; // eslint-disable-next-line no-confusing-arrow

var isBrowser = function isBrowser() {
  return !(0, _isNil2.default)(isBrowser.override) ? isBrowser.override : hasDocument && hasWindow;
};

var _default = isBrowser;
exports.default = _default;