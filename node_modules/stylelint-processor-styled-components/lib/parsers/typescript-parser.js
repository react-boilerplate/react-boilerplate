'use strict';

var parser = require('typescript-eslint-parser');

module.exports = function (input) {
  var ast = parser.parse(input, {
    loc: true,
    range: true,
    tokens: true,
    comment: true,
    useJSXTextNode: true,
    ecmaFeatures: { jsx: true }
  });
  delete ast.tokens;
  return ast;
};