'use strict';

exports.__esModule = true;
exports.expectCSSMatches = exports.stripWhitespace = exports.resetNoParserStyled = exports.resetStyled = exports.seedNextClassnames = undefined;

var _styled2 = require('../constructors/styled');

var _styled3 = _interopRequireDefault(_styled2);

var _css = require('../constructors/css');

var _css2 = _interopRequireDefault(_css);

var _constructWithOptions2 = require('../constructors/constructWithOptions');

var _constructWithOptions3 = _interopRequireDefault(_constructWithOptions2);

var _StyleSheet = require('../models/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _flatten = require('../utils/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _stringifyRules = require('../utils/stringifyRules');

var _stringifyRules2 = _interopRequireDefault(_stringifyRules);

var _StyledComponent2 = require('../models/StyledComponent');

var _StyledComponent3 = _interopRequireDefault(_StyledComponent2);

var _ComponentStyle2 = require('../models/ComponentStyle');

var _ComponentStyle3 = _interopRequireDefault(_ComponentStyle2);

var _css3 = require('../no-parser/css');

var _css4 = _interopRequireDefault(_css3);

var _flatten3 = require('../no-parser/flatten');

var _flatten4 = _interopRequireDefault(_flatten3);

var _stringifyRules3 = require('../no-parser/stringifyRules');

var _stringifyRules4 = _interopRequireDefault(_stringifyRules3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Ignore hashing, just return class names sequentially as .a .b .c etc */
var index = 0;
/**
 * This sets up our end-to-end test suite, which essentially makes sure
 * our public API works the way we promise/want
 */

var seededClassnames = [];
var classNames = function classNames() {
  return seededClassnames.shift() || String.fromCodePoint(97 + index++);
};

var seedNextClassnames = exports.seedNextClassnames = function seedNextClassnames(names) {
  return seededClassnames = names;
};
var resetStyled = exports.resetStyled = function resetStyled() {
  var isServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (!isServer) {
    if (!document.head) throw new Error("Missing document <head>");
    document.head.innerHTML = '';
  }

  _StyleSheet2.default.reset(isServer);
  index = 0;

  var ComponentStyle = (0, _ComponentStyle3.default)(classNames, _flatten2.default, _stringifyRules2.default);
  var constructWithOptions = (0, _constructWithOptions3.default)(_css2.default);
  var StyledComponent = (0, _StyledComponent3.default)(ComponentStyle, constructWithOptions);

  return (0, _styled3.default)(StyledComponent, constructWithOptions);
};

var resetNoParserStyled = exports.resetNoParserStyled = function resetNoParserStyled() {
  if (!document.head) throw new Error("Missing document <head>");
  document.head.innerHTML = '';
  _StyleSheet2.default.reset();
  index = 0;

  var ComponentStyle = (0, _ComponentStyle3.default)(classNames, _flatten4.default, _stringifyRules4.default);
  var constructWithOptions = (0, _constructWithOptions3.default)(_css4.default);
  var StyledComponent = (0, _StyledComponent3.default)(ComponentStyle, constructWithOptions);

  return (0, _styled3.default)(StyledComponent, constructWithOptions);
};

var stripComments = function stripComments(str) {
  return str.replace(/\/\*.*?\*\/\n?/g, '');
};

var stripWhitespace = exports.stripWhitespace = function stripWhitespace(str) {
  return str.trim().replace(/([;\{\}])/g, '$1  ').replace(/\s+/g, ' ');
};

var expectCSSMatches = exports.expectCSSMatches = function expectCSSMatches(_expectation) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ignoreWhitespace: true };

  // NOTE: This should normalise both CSS strings to make irrelevant mismatches less likely
  var expectation = _expectation.replace(/ {/g, '{').replace(/:\s+;/g, ':;');

  var css = Array.from(document.querySelectorAll('style')).map(function (tag) {
    return tag.innerHTML;
  }).join('\n').replace(/ {/g, '{').replace(/:\s+;/g, ':;');

  if (opts.ignoreWhitespace) {
    var stripped = stripWhitespace(stripComments(css));
    expect(stripped).toEqual(stripWhitespace(expectation));
    return stripped;
  } else {
    expect(css).toEqual(expectation);
    return css;
  }
};