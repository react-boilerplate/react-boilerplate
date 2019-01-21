"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _detectors = require("../../utils/detectors");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(t) {
  return function (path, state) {
    if ((0, _detectors.isStyled)(t)(path.node.tag, state) || (0, _detectors.isHelper)(t)(path.node.tag, state)) {
      var _path$node = path.node,
          callee = _path$node.tag,
          _path$node$quasi = _path$node.quasi,
          quasis = _path$node$quasi.quasis,
          expressions = _path$node$quasi.expressions;
      var values = t.arrayExpression(quasis.filter(function (quasi) {
        return quasi.value.cooked !== undefined;
      }).map(function (quasi) {
        return t.stringLiteral(quasi.value.cooked);
      }));
      path.replaceWith(t.callExpression(callee, [values].concat(_toConsumableArray(expressions))));
    }
  };
};

exports.default = _default;