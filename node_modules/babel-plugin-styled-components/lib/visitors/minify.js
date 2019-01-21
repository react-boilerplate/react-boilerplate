'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _options = require('../utils/options');

var _detectors = require('../utils/detectors');

var _minify = require('../minify');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (path, state) {
  if ((0, _options.useMinify)(state) && !(0, _options.useCSSPreprocessor)(state) && ((0, _detectors.isStyled)(path.node.tag, state) || (0, _detectors.isHelper)(path.node.tag, state))) {
    var templateLiteral = path.node.quasi;
    var quasisLength = templateLiteral.quasis.length;

    var rawValuesMinified = (0, _minify.minifyRawValues)(templateLiteral.quasis.map(function (x) {
      return x.value.raw;
    }));
    var cookedValuesMinfified = (0, _minify.minifyCookedValues)(templateLiteral.quasis.map(function (x) {
      return x.value.cooked;
    }));

    for (var i = 0; i < quasisLength; i++) {
      var element = templateLiteral.quasis[i];

      element.value.raw = rawValuesMinified[i];
      element.value.cooked = cookedValuesMinfified[i];
    }
  }
};