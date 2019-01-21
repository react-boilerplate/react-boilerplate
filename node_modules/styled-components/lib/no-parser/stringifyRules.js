'use strict';

exports.__esModule = true;

var babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('prop-types').any;

var stringifyRules = function stringifyRules(rules, selector, prefix) {
  return rules.reduce(function (str, partial, index) {
    return str + (
    // NOTE: This is to not prefix keyframes with the animation name
    (index > 0 || !prefix) && selector ? selector : '') + (partial && Array.isArray(partial) ? partial.join('') : partial.toString());
  }, '');
};

exports.default = stringifyRules;
module.exports = exports['default'];