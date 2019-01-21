"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _pure = _interopRequireDefault(require("./visitors/pure"));

var _minify = _interopRequireDefault(require("./visitors/minify"));

var _displayNameAndId = _interopRequireDefault(require("./visitors/displayNameAndId"));

var _templateLiterals = _interopRequireDefault(require("./visitors/templateLiterals"));

var _assignStyledRequired = _interopRequireDefault(require("./visitors/assignStyledRequired"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(_ref) {
  var t = _ref.types;
  return {
    visitor: {
      CallExpression(path, state) {
        (0, _displayNameAndId.default)(t)(path, state);
        (0, _pure.default)(t)(path, state);
      },

      TaggedTemplateExpression(path, state) {
        (0, _minify.default)(t)(path, state);
        (0, _displayNameAndId.default)(t)(path, state);
        (0, _templateLiterals.default)(t)(path, state);
        (0, _pure.default)(t)(path, state);
      },

      VariableDeclarator(path, state) {
        (0, _assignStyledRequired.default)(t)(path, state);
      }

    }
  };
}