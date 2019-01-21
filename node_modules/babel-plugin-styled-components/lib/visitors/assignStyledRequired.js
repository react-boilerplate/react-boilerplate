'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (path, state) {
  if (t.isCallExpression(path.node.init) && t.isIdentifier(path.node.init.callee) && path.node.init.callee.name === 'require' && path.node.init.arguments && path.node.init.arguments[0] && t.isLiteral(path.node.init.arguments[0]) && path.node.init.arguments[0].value === 'styled-components') {
    state.styledRequired = path.node.id.name;
  }
};