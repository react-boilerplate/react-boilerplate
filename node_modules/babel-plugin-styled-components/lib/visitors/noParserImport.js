'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noParserRequireCallExpression = exports.noParserImportDeclaration = undefined;

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _options = require('../utils/options');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var noParserImportDeclaration = exports.noParserImportDeclaration = function noParserImportDeclaration(path, state) {
  if ((0, _options.useCSSPreprocessor)(state) && path.node.source.value === 'styled-components') {
    path.node.source = t.stringLiteral('styled-components/no-parser');
  }
};

var noParserRequireCallExpression = exports.noParserRequireCallExpression = function noParserRequireCallExpression(path, state) {
  if ((0, _options.useCSSPreprocessor)(state) && path.node.callee.name === 'require' && path.node.arguments && path.node.arguments.length === 1 && t.isStringLiteral(path.node.arguments[0]) && path.node.arguments[0].value === 'styled-components') {
    path.node.arguments = [t.stringLiteral('styled-components/no-parser')];
  }
};