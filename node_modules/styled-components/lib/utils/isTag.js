'use strict';

exports.__esModule = true;
exports.default = isTag;

var babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || require('prop-types').any;

function isTag(target) /* : %checks */{
  return typeof target === 'string';
}
module.exports = exports['default'];