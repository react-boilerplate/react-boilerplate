"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperAnnotateAsPure = _interopRequireDefault(require("@babel/helper-annotate-as-pure"));

var _options = require("../utils/options");

var _detectors = require("../utils/detectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(t) {
  return function (path, state) {
    if ((0, _options.usePureAnnotation)(state)) {
      if ((0, _detectors.isStyled)(t)(path.node, state) || (0, _detectors.isStyled)(t)(path.node.callee, state) || (0, _detectors.isPureHelper)(t)(path.node.tag || path.node.callee, state)) {
        if (path.parent.type === 'VariableDeclarator' || path.parent.type === 'TaggedTemplateExpression') {
          (0, _helperAnnotateAsPure.default)(path);
        }
      }
    }
  };
};

exports.default = _default;