'use strict';

exports.__esModule = true;
exports.objToCss = undefined;

var _hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('prop-types').any;

var objToCss = exports.objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).filter(function (key) {
    var chunk = obj[key];
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
  }).map(function (key) {
    if ((0, _isPlainObject2.default)(obj[key])) return objToCss(obj[key], key);
    return (0, _hyphenateStyleName2.default)(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
      return ruleSet;
    }
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) {
      return [].concat(ruleSet, flatten(chunk, executionContext));
    }

    /* Handle other components */
    if (chunk.hasOwnProperty('styledComponentId')) {
      // $FlowFixMe not sure how to make this pass
      return [].concat(ruleSet, ['.' + chunk.styledComponentId]);
    }

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    return ruleSet.concat(
    // $FlowFixMe have to add %checks somehow to isPlainObject
    (0, _isPlainObject2.default)(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

exports.default = flatten;