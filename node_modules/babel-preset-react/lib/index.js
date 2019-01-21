"use strict";

exports.__esModule = true;

var _babelPresetFlow = require("babel-preset-flow");

var _babelPresetFlow2 = _interopRequireDefault(_babelPresetFlow);

var _babelPluginTransformReactJsx = require("babel-plugin-transform-react-jsx");

var _babelPluginTransformReactJsx2 = _interopRequireDefault(_babelPluginTransformReactJsx);

var _babelPluginSyntaxJsx = require("babel-plugin-syntax-jsx");

var _babelPluginSyntaxJsx2 = _interopRequireDefault(_babelPluginSyntaxJsx);

var _babelPluginTransformReactDisplayName = require("babel-plugin-transform-react-display-name");

var _babelPluginTransformReactDisplayName2 = _interopRequireDefault(_babelPluginTransformReactDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  presets: [_babelPresetFlow2.default],
  plugins: [_babelPluginTransformReactJsx2.default, _babelPluginSyntaxJsx2.default, _babelPluginTransformReactDisplayName2.default],
  env: {
    development: {
      plugins: []
    }
  }
};
module.exports = exports["default"];