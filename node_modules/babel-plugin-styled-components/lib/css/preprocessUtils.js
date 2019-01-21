'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preprocessHelper = exports.convertOutputToBabelTypes = exports.cssWithPlaceholdersToArr = exports.assembleAndInterleavePlaceholders = undefined;

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _stylis = require('stylis');

var _stylis2 = _interopRequireDefault(_stylis);

var _placeholderUtils = require('./placeholderUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var stylis = new _stylis2.default({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true
});

// Assembles CSS partials and replaces interpolations with placeholders
var assembleAndInterleavePlaceholders = exports.assembleAndInterleavePlaceholders = function assembleAndInterleavePlaceholders(cssArr) {
  var css = cssArr[0];

  for (var i = 1; i < cssArr.length; i++) {
    var interpolationIndex = i - 1;
    var placeholder = (0, _placeholderUtils.makePlaceholder)(interpolationIndex);
    var cssPartial = cssArr[i];

    // Append a semicolon to all mixins (not selectors, not rule)
    var separator = (0, _placeholderUtils.isUnendedMixin)(cssPartial) ? ';' : '';

    css += placeholder + separator + cssPartial;
  }

  return css;
};

// Splits the css into an array with interleaved interpolation nodes
var cssWithPlaceholdersToArr = exports.cssWithPlaceholdersToArr = function cssWithPlaceholdersToArr(css, interpolationNodes) {
  var placeholderSplit = (0, _placeholderUtils.splitByPlaceholders)(css);
  var res = [];

  for (var i = 0; i < placeholderSplit.length; i++) {
    var str = placeholderSplit[i];
    var isInterpolation = i % 2 !== 0;

    if (isInterpolation) {
      var interpolationIndex = parseInt(str, 10);
      res.push(interpolationNodes[interpolationIndex]);
    } else {
      res.push(str);
    }
  }

  return res;
};

// Convert CSS strings back to babel string literals
// and turn arrays back into babel array expressions
var convertOutputToBabelTypes = exports.convertOutputToBabelTypes = function convertOutputToBabelTypes(arrOfCSSArr) {
  return t.arrayExpression(arrOfCSSArr.map(function (cssArr) {
    return t.arrayExpression(cssArr.map(function (x) {
      return typeof x === 'string' ? t.stringLiteral(x) : x;
    }));
  }));
};

/*
 * Flattens and splits CSS into an array where classname should be injected, and maps these
 * partials to an array with interleaves interpolation nodes.
 * Example:
 * [
 *   [ ':hover { color: blue; background:', props => props.background, '; }' ]
 * ]
 */
var preprocessHelper = exports.preprocessHelper = function preprocessHelper(cssArr, interpolationNodes) {
  var transformFlattened = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (x) {
    return x;
  };
  var stylisNamespace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var fixGlobals = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // Test whether the input is using reserved strings
  if (cssArr.some(function (x) {
    return (0, _placeholderUtils.containsPlaceholders)(x) || x.includes(_placeholderUtils.temporaryClassname);
  })) {
    throw new TypeError(`CSS Input can't contain Styled Components placeholders of the format: __PLACEHOLDER_1__ or __TEMPORARY_CLASSNAME__.`);
  }

  var css = transformFlattened(assembleAndInterleavePlaceholders(cssArr));

  // Flatten CSS using stylis
  var flattenedCSS = stylis(stylisNamespace, css, false, false).trim();

  if (fixGlobals && flattenedCSS.startsWith('{')) {
    flattenedCSS = (0, _placeholderUtils.fixGlobalPlaceholders)(flattenedCSS);
  }

  var classnameSplit = flattenedCSS.split(_placeholderUtils.temporaryClassname).filter(function (x) {
    return x !== '';
  }).map(function (str) {
    return cssWithPlaceholdersToArr(str, interpolationNodes);
  });

  return classnameSplit;
};