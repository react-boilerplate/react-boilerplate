"use strict";

exports.__esModule = true;

var _babelPluginTransformFlowStripTypes = require("babel-plugin-transform-flow-strip-types");

var _babelPluginTransformFlowStripTypes2 = _interopRequireDefault(_babelPluginTransformFlowStripTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  plugins: [_babelPluginTransformFlowStripTypes2.default]
};
module.exports = exports["default"];