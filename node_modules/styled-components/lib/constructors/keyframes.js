'use strict';

exports.__esModule = true;

var _hash = require('../vendor/glamor/hash');

var _hash2 = _interopRequireDefault(_hash);

var _StyleSheet = require('../models/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Stringifier = require('../types').babelPluginFlowReactPropTypes_proptype_Stringifier || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NameGenerator = require('../types').babelPluginFlowReactPropTypes_proptype_NameGenerator || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('prop-types').any;

var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

exports.default = function (nameGenerator, stringifyRules, css) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = (0, _hash2.default)(replaceWhitespace(JSON.stringify(rules)));

    var existingName = _StyleSheet2.default.instance.getName(hash);
    if (existingName) return existingName;

    var name = nameGenerator(hash);
    if (_StyleSheet2.default.instance.alreadyInjected(hash, name)) return name;

    var generatedCSS = stringifyRules(rules, name, '@keyframes');
    _StyleSheet2.default.instance.inject('sc-keyframes-' + name, true, generatedCSS, hash, name);
    return name;
  };
};

module.exports = exports['default'];