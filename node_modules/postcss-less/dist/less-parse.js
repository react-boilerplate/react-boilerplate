'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lessParse;

var _input = require('postcss/lib/input');

var _input2 = _interopRequireDefault(_input);

var _lessParser = require('./less-parser');

var _lessParser2 = _interopRequireDefault(_lessParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lessParse(less, opts) {
  var input = new _input2.default(less, opts);
  var parser = new _lessParser2.default(input, opts);
  // const parser = new Parser(input, opts);

  parser.tokenize();
  parser.loop();

  return parser.root;
}
// import Parser from 'postcss/lib/parser';

module.exports = exports['default'];