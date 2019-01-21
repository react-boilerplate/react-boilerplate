'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _detectors = require('../../utils/detectors');

var _preprocess = require('../../css/preprocess');

var _preprocess2 = _interopRequireDefault(_preprocess);

var _preprocessKeyframes = require('../../css/preprocessKeyframes');

var _preprocessKeyframes2 = _interopRequireDefault(_preprocessKeyframes);

var _preprocessInjectGlobal = require('../../css/preprocessInjectGlobal');

var _preprocessInjectGlobal2 = _interopRequireDefault(_preprocessInjectGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (path, state) {
  var _isStyled = (0, _detectors.isStyled)(path.node.tag, state);
  var _isCSSHelper = (0, _detectors.isCSSHelper)(path.node.tag, state);
  var _isKeyframesHelper = (0, _detectors.isKeyframesHelper)(path.node.tag, state);
  var _isInjectGlobalHelper = (0, _detectors.isInjectGlobalHelper)(path.node.tag, state);

  if (_isStyled || _isCSSHelper || _isInjectGlobalHelper || _isKeyframesHelper) {
    var _path$node = path.node,
        callee = _path$node.tag,
        _path$node$quasi = _path$node.quasi,
        quasis = _path$node$quasi.quasis,
        expressions = _path$node$quasi.expressions;

    var values = quasis.map(function (quasi) {
      return quasi.value.cooked;
    });

    var result = void 0;
    if (_isStyled || _isCSSHelper) {
      result = (0, _preprocess2.default)(values, expressions);
    } else if (_isInjectGlobalHelper) {
      result = (0, _preprocessInjectGlobal2.default)(values, expressions);
    } else {
      // _isKeyframesHelper
      result = (0, _preprocessKeyframes2.default)(values, expressions);
    }

    path.replaceWith(t.callExpression(callee, [result]));
  }
};