"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _options = require("../../utils/options");

var _transpile = _interopRequireDefault(require("./transpile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(t) {
  return function (path, state) {
    if ((0, _options.useTranspileTemplateLiterals)(state)) {
      (0, _transpile.default)(t)(path, state);
    }
  };
};

exports.default = _default;