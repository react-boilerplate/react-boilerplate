'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _flatten2 = require('../utils/flatten');

var _flatten3 = _interopRequireDefault(_flatten2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('prop-types').any;

var isRuleSet = function isRuleSet(interpolation) {
  return !!(interpolation && Array.isArray(interpolation) && interpolation.length > 0 && interpolation[0] && Array.isArray(interpolation[0]));
};

var flatten = function flatten(chunks, executionContext) {
  /* Fall back to old flattener for non-rule-set chunks */
  if (!isRuleSet(chunks)) {
    return (0, _flatten3.default)(chunks, executionContext);
  }

  return chunks.reduce(function (ruleSet, chunk) {
    if (!Array.isArray(chunk)) {
      return ruleSet;
    }

    var appendChunks = [];

    var newChunk = chunk.reduce(function (rules, rule) {
      /* Remove falsey values */
      if (rule === undefined || rule === null || rule === false || rule === '') {
        return rules;
      }

      /* Flatten nested rule set */
      if (isRuleSet(rule)) {
        // $FlowFixMe Don't know what's wrong here
        appendChunks = [].concat(appendChunks, flatten(rule, executionContext));
        return rules;
      }

      /* Stringify unexpected array */
      if (Array.isArray(rule)) {
        return [].concat(rules, (0, _flatten3.default)(rule, executionContext));
      }

      /* Either execute or defer the function */
      if (typeof rule === 'function') {
        if (executionContext) {
          var res = rule(executionContext);

          if (isRuleSet(res)) {
            appendChunks = [].concat(appendChunks, flatten(res, executionContext));
            return rules;
          }

          /* Flatten non-ruleset values */
          return [].concat(rules, flatten([res], executionContext));
        } else {
          return [].concat(rules, [rule]);
        }
      }

      /* Handle other components */
      if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object' && rule.hasOwnProperty('styledComponentId')) {
        return [].concat(rules, ['.' + rule.styledComponentId]);
      }

      /* Convert object to css string */
      if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object' && (0, _isPlainObject2.default)(rule)) {
        return [].concat(rules, [(0, _flatten2.objToCss)(rule)]);
      }

      return [].concat(rules, [rule.toString()]);
    }, []);

    if (executionContext) {
      var newChunkStr = newChunk.join('');
      if (appendChunks.length) {
        return [].concat(ruleSet, [newChunkStr], appendChunks);
      }

      return [].concat(ruleSet, [newChunkStr]);
    }

    return [].concat(ruleSet, [newChunk], appendChunks);
  }, []);
};

exports.default = flatten;
module.exports = exports['default'];