"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _detectors = require("../utils/detectors");

var _default = function _default(t) {
  return function (path, state) {
    if (t.isCallExpression(path.node.init) && t.isIdentifier(path.node.init.callee) && path.node.init.callee.name === 'require' && path.node.init.arguments && path.node.init.arguments[0] && t.isLiteral(path.node.init.arguments[0]) && (0, _detectors.isValidTopLevelImport)(path.node.init.arguments[0].value)) {
      state.styledRequired = path.node.id.name;
    }
  };
};

exports.default = _default;