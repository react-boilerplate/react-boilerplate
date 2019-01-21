"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var parser = _interopRequireWildcard(require("./grammar"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _require = require("./tokenizer"),
    tokenize = _require.tokenize;

function parse(source) {
  var tokens = tokenize(source); // We pass the source here to show code frames

  var ast = parser.parse(tokens, source);
  return ast;
}