"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _options = require("../utils/options");

var _detectors = require("../utils/detectors");

var _minify = require("../minify");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(t) {
  return function (path, state) {
    if ((0, _options.useMinify)(state) && ((0, _detectors.isStyled)(t)(path.node.tag, state) || (0, _detectors.isHelper)(t)(path.node.tag, state))) {
      var templateLiteral = path.node.quasi;
      var quasisLength = templateLiteral.quasis.length;

      var _minifyRawValues = (0, _minify.minifyRawValues)(templateLiteral.quasis.map(function (x) {
        return x.value.raw;
      })),
          _minifyRawValues2 = _slicedToArray(_minifyRawValues, 1),
          rawValuesMinified = _minifyRawValues2[0];

      var _minifyCookedValues = (0, _minify.minifyCookedValues)(templateLiteral.quasis.map(function (x) {
        return x.value.cooked;
      })),
          _minifyCookedValues2 = _slicedToArray(_minifyCookedValues, 2),
          cookedValuesMinfified = _minifyCookedValues2[0],
          eliminatedExpressionIndices = _minifyCookedValues2[1];

      eliminatedExpressionIndices.forEach(function (expressionIndex, iteration) {
        templateLiteral.expressions.splice(expressionIndex - iteration, 1);
      });

      for (var i = 0; i < quasisLength; i++) {
        var element = templateLiteral.quasis[i];
        element.value.raw = rawValuesMinified[i];
        element.value.cooked = cookedValuesMinfified[i];
      }
    }
  };
};

exports.default = _default;