'use strict';

exports.__esModule = true;

var _interleave = require('../utils/interleave');

var _interleave2 = _interopRequireDefault(_interleave);

var _flatten = require('../utils/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('prop-types').any;

exports.default = function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return (0, _flatten2.default)((0, _interleave2.default)(strings, interpolations));
};

module.exports = exports['default'];