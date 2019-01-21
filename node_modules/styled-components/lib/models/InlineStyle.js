'use strict';

exports.__esModule = true;
exports.resetStyleCache = undefined;

var _cssToReactNative = require('css-to-react-native');

var _cssToReactNative2 = _interopRequireDefault(_cssToReactNative);

var _hash = require('../vendor/glamor/hash');

var _hash2 = _interopRequireDefault(_hash);

var _flatten = require('../utils/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _parse = require('../vendor/postcss-safe-parser/parse');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* eslint-disable import/no-unresolved */


var babelPluginFlowReactPropTypes_proptype_StyleSheet = require('../types').babelPluginFlowReactPropTypes_proptype_StyleSheet || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_RuleSet = require('../types').babelPluginFlowReactPropTypes_proptype_RuleSet || require('prop-types').any;

var generated = {};

var resetStyleCache = exports.resetStyleCache = function resetStyleCache() {
  generated = {};
};

/*
 InlineStyle takes arbitrary CSS and generates a flat object
 */

exports.default = function (styleSheet) {
  var InlineStyle = function () {
    function InlineStyle(rules) {
      _classCallCheck(this, InlineStyle);

      this.rules = rules;
    }

    InlineStyle.prototype.generateStyleObject = function generateStyleObject(executionContext) {
      var flatCSS = (0, _flatten2.default)(this.rules, executionContext).join('');
      var hash = (0, _hash2.default)(flatCSS);
      if (!generated[hash]) {
        var root = (0, _parse2.default)(flatCSS);
        var declPairs = [];
        root.each(function (node) {
          if (node.type === 'decl') {
            declPairs.push([node.prop, node.value]);
          } else if (node.type !== 'comment' && process.env.NODE_ENV !== 'production') {
            /* eslint-disable no-console */
            console.warn('Node of type ' + node.type + ' not supported as an inline style');
          }
        });
        // RN currently does not support differing values for the corner radii of Image
        // components (but does for View). It is almost impossible to tell whether we'll have
        // support, so we'll just disable multiple values here.
        // https://github.com/styled-components/css-to-react-native/issues/11
        var styleObject = (0, _cssToReactNative2.default)(declPairs, ['borderRadius', 'borderWidth', 'borderColor', 'borderStyle']);
        var styles = styleSheet.create({
          generated: styleObject
        });
        generated[hash] = styles.generated;
      }
      return generated[hash];
    };

    return InlineStyle;
  }();

  return InlineStyle;
};