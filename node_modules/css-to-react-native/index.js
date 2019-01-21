'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var parse = require('postcss-value-parser');
var parse__default = _interopDefault(parse);
var cssColorKeywords = _interopDefault(require('css-color-keywords'));
var camelizeStyleName = _interopDefault(require('fbjs/lib/camelizeStyleName'));

var matchString = function matchString(node) {
  if (node.type !== 'string') return null;
  return node.value.replace(/\\([0-9a-f]{1,6})(?:\s|$)/gi, function (match, charCode) {
    return String.fromCharCode(parseInt(charCode, 16));
  }).replace(/\\/g, '');
};

var hexColorRe = /^(#(?:[0-9a-f]{3,4}){1,2})$/i;
var cssFunctionNameRe = /^(rgba?|hsla?|hwb|lab|lch|gray|color)$/;

var matchColor = function matchColor(node) {
  if (node.type === 'word' && (hexColorRe.test(node.value) || node.value in cssColorKeywords)) {
    return node.value;
  } else if (node.type === 'function' && cssFunctionNameRe.test(node.value)) {
    return parse.stringify(node);
  }
  return null;
};

var noneRe = /^(none)$/i;
var autoRe = /^(auto)$/i;
var identRe = /(^-?[_a-z][_a-z0-9-]*$)/i;
// Note if these are wrong, you'll need to change index.js too
var numberRe = /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?)$/;
// Note lengthRe is sneaky: you can omit units for 0
var lengthRe = /^(0$|(?:[+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?)(?=px$))/;
var unsupportedUnitRe = /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?(ch|em|ex|rem|vh|vw|vmin|vmax|cm|mm|in|pc|pt))$/;
var angleRe = /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?(?:deg|rad))$/;
var percentRe = /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?%)$/;

var noopToken = function noopToken(predicate) {
  return function (node) {
    return predicate(node) ? '<token>' : null;
  };
};

var valueForTypeToken = function valueForTypeToken(type) {
  return function (node) {
    return node.type === type ? node.value : null;
  };
};

var regExpToken = function regExpToken(regExp) {
  var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String;
  return function (node) {
    if (node.type !== 'word') return null;

    var match = node.value.match(regExp);
    if (match === null) return null;

    var value = transform(match[1]);

    return value;
  };
};

var tokens = {
  SPACE: noopToken(function (node) {
    return node.type === 'space';
  }),
  SLASH: noopToken(function (node) {
    return node.type === 'div' && node.value === '/';
  }),
  COMMA: noopToken(function (node) {
    return node.type === 'div' && node.value === ',';
  }),
  WORD: valueForTypeToken('word'),
  NONE: regExpToken(noneRe),
  AUTO: regExpToken(autoRe),
  NUMBER: regExpToken(numberRe, Number),
  LENGTH: regExpToken(lengthRe, Number),
  UNSUPPORTED_LENGTH_UNIT: regExpToken(unsupportedUnitRe),
  ANGLE: regExpToken(angleRe),
  PERCENT: regExpToken(percentRe),
  IDENT: regExpToken(identRe),
  STRING: matchString,
  COLOR: matchColor,
  LINE: regExpToken(/^(none|underline|line-through)$/i)
};

var LENGTH = tokens.LENGTH,
    UNSUPPORTED_LENGTH_UNIT = tokens.UNSUPPORTED_LENGTH_UNIT,
    PERCENT = tokens.PERCENT,
    COLOR = tokens.COLOR,
    SPACE = tokens.SPACE,
    NONE = tokens.NONE;


var directionFactory = function directionFactory(_ref) {
  var _ref$types = _ref.types,
      types = _ref$types === undefined ? [LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT] : _ref$types,
      _ref$directions = _ref.directions,
      directions = _ref$directions === undefined ? ['Top', 'Right', 'Bottom', 'Left'] : _ref$directions,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === undefined ? '' : _ref$suffix;
  return function (tokenStream) {
    var _output;

    var values = [];

    // borderWidth doesn't currently allow a percent value, but may do in the future
    values.push(tokenStream.expect.apply(tokenStream, _toConsumableArray(types)));

    while (values.length < 4 && tokenStream.hasTokens()) {
      tokenStream.expect(SPACE);
      values.push(tokenStream.expect.apply(tokenStream, _toConsumableArray(types)));
    }

    tokenStream.expectEmpty();

    var top = values[0],
        _values$ = values[1],
        right = _values$ === undefined ? top : _values$,
        _values$2 = values[2],
        bottom = _values$2 === undefined ? top : _values$2,
        _values$3 = values[3],
        left = _values$3 === undefined ? right : _values$3;


    var keyFor = function keyFor(n) {
      return '' + prefix + directions[n] + suffix;
    };

    var output = (_output = {}, _defineProperty(_output, keyFor(0), top), _defineProperty(_output, keyFor(1), right), _defineProperty(_output, keyFor(2), bottom), _defineProperty(_output, keyFor(3), left), _output);

    return { $merge: output };
  };
};

var anyOrderFactory = function anyOrderFactory(properties) {
  var delim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SPACE;
  return function (tokenStream) {
    var propertyNames = Object.keys(properties);
    var values = propertyNames.reduce(function (accum, propertyName) {
      accum[propertyName] === undefined; // eslint-disable-line
      return accum;
    }, {});

    var numParsed = 0;
    while (numParsed < propertyNames.length && tokenStream.hasTokens()) {
      if (numParsed) tokenStream.expect(delim);

      var matchedPropertyName = propertyNames.find(function (propertyName) {
        return values[propertyName] === undefined && properties[propertyName].tokens.some(function (token) {
          return tokenStream.matches(token);
        });
      });

      if (!matchedPropertyName) {
        tokenStream.throw();
      } else {
        values[matchedPropertyName] = tokenStream.lastValue;
      }

      numParsed += 1;
    }

    tokenStream.expectEmpty();

    propertyNames.forEach(function (propertyName) {
      if (values[propertyName] === undefined) values[propertyName] = properties[propertyName].default;
    });

    return { $merge: values };
  };
};

var shadowOffsetFactory = function shadowOffsetFactory() {
  return function (tokenStream) {
    var width = tokenStream.expect(LENGTH);
    var height = tokenStream.matches(SPACE) ? tokenStream.expect(LENGTH) : width;
    tokenStream.expectEmpty();
    return { width: width, height: height };
  };
};

var parseShadow = function parseShadow(tokenStream) {
  var offsetX = void 0;
  var offsetY = void 0;
  var radius = void 0;
  var color = void 0;

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty();
    return {
      offset: { width: 0, height: 0 },
      radius: 0,
      color: 'black'
    };
  }

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    if (offsetX === undefined && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)) {
      offsetX = tokenStream.lastValue;
      tokenStream.expect(SPACE);
      offsetY = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT);

      tokenStream.saveRewindPoint();
      if (tokenStream.matches(SPACE) && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)) {
        radius = tokenStream.lastValue;
      } else {
        tokenStream.rewind();
      }
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = tokenStream.lastValue;
    } else {
      tokenStream.throw();
    }

    didParseFirst = true;
  }

  if (offsetX === undefined) tokenStream.throw();

  return {
    offset: { width: offsetX, height: offsetY },
    radius: radius !== undefined ? radius : 0,
    color: color !== undefined ? color : 'black'
  };
};

var boxShadow = function boxShadow(tokenStream) {
  var _parseShadow = parseShadow(tokenStream),
      offset = _parseShadow.offset,
      radius = _parseShadow.radius,
      color = _parseShadow.color;

  return {
    $merge: {
      shadowOffset: offset,
      shadowRadius: radius,
      shadowColor: color,
      shadowOpacity: 1
    }
  };
};

var NONE$1 = tokens.NONE,
    AUTO = tokens.AUTO,
    NUMBER = tokens.NUMBER,
    LENGTH$1 = tokens.LENGTH,
    SPACE$1 = tokens.SPACE;


var defaultFlexGrow = 1;
var defaultFlexShrink = 1;
var defaultFlexBasis = 0;

var FLEX_BASIS_AUTO = {}; // Used for reference equality

var flex = function flex(tokenStream) {
  var flexGrow = void 0;
  var flexShrink = void 0;
  var flexBasis = void 0;

  if (tokenStream.matches(NONE$1)) {
    tokenStream.expectEmpty();
    return { $merge: { flexGrow: 0, flexShrink: 0 } };
  }

  tokenStream.saveRewindPoint();
  if (tokenStream.matches(AUTO) && !tokenStream.hasTokens()) {
    return { $merge: { flexGrow: 1, flexShrink: 1 } };
  }
  tokenStream.rewind();

  var partsParsed = 0;
  while (partsParsed < 2 && tokenStream.hasTokens()) {
    if (partsParsed !== 0) tokenStream.expect(SPACE$1);

    if (flexGrow === undefined && tokenStream.matches(NUMBER)) {
      flexGrow = tokenStream.lastValue;

      tokenStream.saveRewindPoint();
      if (tokenStream.matches(SPACE$1) && tokenStream.matches(NUMBER)) {
        flexShrink = tokenStream.lastValue;
      } else {
        tokenStream.rewind();
      }
    } else if (flexBasis === undefined && tokenStream.matches(LENGTH$1)) {
      flexBasis = tokenStream.lastValue;
    } else if (flexBasis === undefined && tokenStream.matches(AUTO)) {
      flexBasis = FLEX_BASIS_AUTO;
    } else {
      tokenStream.throw();
    }

    partsParsed += 1;
  }

  tokenStream.expectEmpty();

  if (flexGrow === undefined) flexGrow = defaultFlexGrow;
  if (flexShrink === undefined) flexShrink = defaultFlexShrink;
  if (flexBasis === undefined) flexBasis = defaultFlexBasis;

  return flexBasis !== FLEX_BASIS_AUTO ? { $merge: { flexGrow: flexGrow, flexShrink: flexShrink, flexBasis: flexBasis } } : { $merge: { flexGrow: flexGrow, flexShrink: flexShrink } };
};

var SPACE$2 = tokens.SPACE,
    IDENT = tokens.IDENT,
    STRING = tokens.STRING;


var parseFontFamily = function parseFontFamily(tokenStream) {
  var fontFamily = void 0;

  if (tokenStream.matches(STRING)) {
    fontFamily = tokenStream.lastValue;
  } else {
    fontFamily = tokenStream.expect(IDENT);
    while (tokenStream.hasTokens()) {
      tokenStream.expect(SPACE$2);
      var nextIdent = tokenStream.expect(IDENT);
      fontFamily += ' ' + nextIdent;
    }
  }

  tokenStream.expectEmpty();

  return fontFamily;
};

var SPACE$3 = tokens.SPACE,
    LENGTH$2 = tokens.LENGTH,
    UNSUPPORTED_LENGTH_UNIT$1 = tokens.UNSUPPORTED_LENGTH_UNIT,
    NUMBER$1 = tokens.NUMBER,
    SLASH = tokens.SLASH;

var NORMAL = regExpToken(/^(normal)$/);
var STYLE = regExpToken(/^(italic)$/);
var WEIGHT = regExpToken(/^([1-9]00|bold)$/);
var VARIANT = regExpToken(/^(small-caps)$/);

var defaultFontStyle = 'normal';
var defaultFontWeight = 'normal';
var defaultFontVariant = [];

var font = function font(tokenStream) {
  var fontStyle = void 0;
  var fontWeight = void 0;
  var fontVariant = void 0;
  // let fontSize;
  var lineHeight = void 0;
  // let fontFamily;

  var numStyleWeightVariantMatched = 0;
  while (numStyleWeightVariantMatched < 3 && tokenStream.hasTokens()) {
    if (tokenStream.matches(NORMAL)) {
      /* pass */
    } else if (fontStyle === undefined && tokenStream.matches(STYLE)) {
      fontStyle = tokenStream.lastValue;
    } else if (fontWeight === undefined && tokenStream.matches(WEIGHT)) {
      fontWeight = tokenStream.lastValue;
    } else if (fontVariant === undefined && tokenStream.matches(VARIANT)) {
      fontVariant = [tokenStream.lastValue];
    } else {
      break;
    }

    tokenStream.expect(SPACE$3);
    numStyleWeightVariantMatched += 1;
  }

  var fontSize = tokenStream.expect(LENGTH$2, UNSUPPORTED_LENGTH_UNIT$1);

  if (tokenStream.matches(SLASH)) {
    if (tokenStream.matches(NUMBER$1)) {
      lineHeight = fontSize * tokenStream.lastValue;
    } else {
      lineHeight = tokenStream.expect(LENGTH$2, UNSUPPORTED_LENGTH_UNIT$1);
    }
  }

  tokenStream.expect(SPACE$3);

  var fontFamily = parseFontFamily(tokenStream);

  if (fontStyle === undefined) fontStyle = defaultFontStyle;
  if (fontWeight === undefined) fontWeight = defaultFontWeight;
  if (fontVariant === undefined) fontVariant = defaultFontVariant;

  var out = { fontStyle: fontStyle, fontWeight: fontWeight, fontVariant: fontVariant, fontSize: fontSize, fontFamily: fontFamily };
  if (lineHeight !== undefined) out.lineHeight = lineHeight;

  return { $merge: out };
};

var textShadow = function textShadow(tokenStream) {
  var _parseShadow2 = parseShadow(tokenStream),
      offset = _parseShadow2.offset,
      radius = _parseShadow2.radius,
      color = _parseShadow2.color;

  return {
    $merge: {
      textShadowOffset: offset,
      textShadowRadius: radius,
      textShadowColor: color
    }
  };
};

var SPACE$4 = tokens.SPACE,
    LINE = tokens.LINE,
    COLOR$1 = tokens.COLOR;


var STYLE$1 = regExpToken(/^(solid|double|dotted|dashed)$/);

var defaultTextDecorationLine = 'none';
var defaultTextDecorationStyle = 'solid';
var defaultTextDecorationColor = 'black';

var textDecoration = function textDecoration(tokenStream) {
  var line = void 0;
  var style = void 0;
  var color = void 0;

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE$4);

    if (line === undefined && tokenStream.matches(LINE)) {
      var lines = [tokenStream.lastValue.toLowerCase()];

      tokenStream.saveRewindPoint();
      if (lines[0] !== 'none' && tokenStream.matches(SPACE$4) && tokenStream.matches(LINE)) {
        lines.push(tokenStream.lastValue.toLowerCase());
        // Underline comes before line-through
        lines.sort().reverse();
      } else {
        tokenStream.rewind();
      }

      line = lines.join(' ');
    } else if (style === undefined && tokenStream.matches(STYLE$1)) {
      style = tokenStream.lastValue;
    } else if (color === undefined && tokenStream.matches(COLOR$1)) {
      color = tokenStream.lastValue;
    } else {
      tokenStream.throw();
    }

    didParseFirst = true;
  }

  var $merge = {
    textDecorationLine: line !== undefined ? line : defaultTextDecorationLine,
    textDecorationColor: color !== undefined ? color : defaultTextDecorationColor,
    textDecorationStyle: style !== undefined ? style : defaultTextDecorationStyle
  };
  return { $merge: $merge };
};

var SPACE$5 = tokens.SPACE,
    LINE$1 = tokens.LINE;


var textDecorationLine = function textDecorationLine(tokenStream) {
  var lines = [];

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE$5);

    lines.push(tokenStream.expect(LINE$1).toLowerCase());

    didParseFirst = true;
  }

  lines.sort().reverse();

  return lines.join(' ');
};

var SPACE$6 = tokens.SPACE,
    COMMA = tokens.COMMA,
    LENGTH$3 = tokens.LENGTH,
    NUMBER$2 = tokens.NUMBER,
    ANGLE = tokens.ANGLE;


var oneOfType = function oneOfType(tokenType) {
  return function (functionStream) {
    var value = functionStream.expect(tokenType);
    functionStream.expectEmpty();
    return value;
  };
};

var singleNumber = oneOfType(NUMBER$2);
var singleLength = oneOfType(LENGTH$3);
var singleAngle = oneOfType(ANGLE);
var xyTransformFactory = function xyTransformFactory(tokenType) {
  return function (key, valueIfOmitted) {
    return function (functionStream) {
      var x = functionStream.expect(tokenType);

      var y = void 0;
      if (functionStream.hasTokens()) {
        functionStream.expect(COMMA);
        y = functionStream.expect(tokenType);
      } else if (valueIfOmitted !== undefined) {
        y = valueIfOmitted;
      } else {
        // Assumption, if x === y, then we can omit XY
        // I.e. scale(5) => [{ scale: 5 }] rather than [{ scaleX: 5 }, { scaleY: 5 }]
        return x;
      }

      functionStream.expectEmpty();

      return [_defineProperty({}, key + 'Y', y), _defineProperty({}, key + 'X', x)];
    };
  };
};
var xyNumber = xyTransformFactory(NUMBER$2);
var xyLength = xyTransformFactory(LENGTH$3);
var xyAngle = xyTransformFactory(ANGLE);

var partTransforms = {
  perspective: singleNumber,
  scale: xyNumber('scale'),
  scaleX: singleNumber,
  scaleY: singleNumber,
  translate: xyLength('translate', 0),
  translateX: singleLength,
  translateY: singleLength,
  rotate: singleAngle,
  rotateX: singleAngle,
  rotateY: singleAngle,
  rotateZ: singleAngle,
  skewX: singleAngle,
  skewY: singleAngle,
  skew: xyAngle('skew', '0deg')
};

var transform = function transform(tokenStream) {
  var transforms = [];

  var didParseFirst = false;
  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE$6);

    var functionStream = tokenStream.expectFunction();
    var functionName = functionStream.functionName;

    var transformedValues = partTransforms[functionName](functionStream);
    if (!Array.isArray(transformedValues)) {
      transformedValues = [_defineProperty({}, functionName, transformedValues)];
    }
    transforms = transformedValues.concat(transforms);

    didParseFirst = true;
  }

  return transforms;
};

var IDENT$1 = tokens.IDENT,
    WORD = tokens.WORD,
    COLOR$2 = tokens.COLOR,
    LENGTH$4 = tokens.LENGTH,
    UNSUPPORTED_LENGTH_UNIT$2 = tokens.UNSUPPORTED_LENGTH_UNIT,
    PERCENT$1 = tokens.PERCENT,
    AUTO$1 = tokens.AUTO;


var background = function background(tokenStream) {
  return {
    $merge: { backgroundColor: tokenStream.expect(COLOR$2) }
  };
};
var border = anyOrderFactory({
  borderWidth: {
    tokens: [LENGTH$4, UNSUPPORTED_LENGTH_UNIT$2],
    default: 1
  },
  borderColor: {
    tokens: [COLOR$2],
    default: 'black'
  },
  borderStyle: {
    tokens: [regExpToken(/^(solid|dashed|dotted)$/)],
    default: 'solid'
  }
});
var borderColor = directionFactory({
  types: [WORD],
  prefix: 'border',
  suffix: 'Color'
});
var borderRadius = directionFactory({
  directions: ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'],
  prefix: 'border',
  suffix: 'Radius'
});
var borderWidth = directionFactory({ prefix: 'border', suffix: 'Width' });
var margin = directionFactory({
  types: [LENGTH$4, UNSUPPORTED_LENGTH_UNIT$2, PERCENT$1, AUTO$1],
  prefix: 'margin'
});
var padding = directionFactory({ prefix: 'padding' });
var flexFlow = anyOrderFactory({
  flexWrap: {
    tokens: [regExpToken(/(nowrap|wrap|wrap-reverse)/)],
    default: 'nowrap'
  },
  flexDirection: {
    tokens: [regExpToken(/(row|row-reverse|column|column-reverse)/)],
    default: 'row'
  }
});
var fontVariant = function fontVariant(tokenStream) {
  return [tokenStream.expect(IDENT$1)];
};
var fontWeight = function fontWeight(tokenStream) {
  return tokenStream.expect(WORD);
}; // Also match numbers as strings
var shadowOffset = shadowOffsetFactory();
var textShadowOffset = shadowOffsetFactory();

var transforms = {
  background: background,
  border: border,
  borderColor: borderColor,
  borderRadius: borderRadius,
  borderWidth: borderWidth,
  boxShadow: boxShadow,
  flex: flex,
  flexFlow: flexFlow,
  font: font,
  fontFamily: parseFontFamily,
  fontVariant: fontVariant,
  fontWeight: fontWeight,
  margin: margin,
  padding: padding,
  shadowOffset: shadowOffset,
  textShadow: textShadow,
  textShadowOffset: textShadowOffset,
  textDecoration: textDecoration,
  textDecorationLine: textDecorationLine,
  transform: transform
};

var SYMBOL_MATCH = 'SYMBOL_MATCH';

var TokenStream = function () {
  function TokenStream(nodes, parent) {
    _classCallCheck(this, TokenStream);

    this.index = 0;
    this.nodes = nodes;
    this.functionName = parent != null ? parent.value : null;
    this.lastValue = null;
    this.rewindIndex = -1;
  }

  _createClass(TokenStream, [{
    key: 'hasTokens',
    value: function hasTokens() {
      return this.index <= this.nodes.length - 1;
    }
  }, {
    key: SYMBOL_MATCH,
    value: function value() {
      if (!this.hasTokens()) return null;

      var node = this.nodes[this.index];

      for (var i = 0; i < arguments.length; i += 1) {
        var tokenDescriptor = arguments.length <= i ? undefined : arguments[i];
        var value = tokenDescriptor(node);
        if (value !== null) {
          this.index += 1;
          this.lastValue = value;
          return value;
        }
      }

      return null;
    }
  }, {
    key: 'matches',
    value: function matches() {
      return this[SYMBOL_MATCH].apply(this, arguments) !== null;
    }
  }, {
    key: 'expect',
    value: function expect() {
      var value = this[SYMBOL_MATCH].apply(this, arguments);
      return value !== null ? value : this.throw();
    }
  }, {
    key: 'matchesFunction',
    value: function matchesFunction() {
      var node = this.nodes[this.index];
      if (node.type !== 'function') return null;
      var value = new TokenStream(node.nodes, node);
      this.index += 1;
      this.lastValue = null;
      return value;
    }
  }, {
    key: 'expectFunction',
    value: function expectFunction() {
      var value = this.matchesFunction();
      return value !== null ? value : this.throw();
    }
  }, {
    key: 'expectEmpty',
    value: function expectEmpty() {
      if (this.hasTokens()) this.throw();
    }
  }, {
    key: 'throw',
    value: function _throw() {
      throw new Error('Unexpected token type: ' + this.nodes[this.index].type);
    }
  }, {
    key: 'saveRewindPoint',
    value: function saveRewindPoint() {
      this.rewindIndex = this.index;
    }
  }, {
    key: 'rewind',
    value: function rewind() {
      if (this.rewindIndex === -1) throw new Error('Internal error');
      this.index = this.rewindIndex;
      this.lastValue = null;
    }
  }]);

  return TokenStream;
}();

/* eslint-disable no-param-reassign */
// Note if this is wrong, you'll need to change tokenTypes.js too


var numberOrLengthRe = /^([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?)(?:px)?$/i;
var boolRe = /^true|false$/i;
var nullRe = /^null$/i;
var undefinedRe = /^undefined$/i;

// Undocumented export
var transformRawValue = function transformRawValue(input) {
  var value = input.trim();

  var numberMatch = value.match(numberOrLengthRe);
  if (numberMatch !== null) return Number(numberMatch[1]);

  var boolMatch = input.match(boolRe);
  if (boolMatch !== null) return boolMatch[0].toLowerCase() === 'true';

  var nullMatch = input.match(nullRe);
  if (nullMatch !== null) return null;

  var undefinedMatch = input.match(undefinedRe);
  if (undefinedMatch !== null) return undefined;

  return value;
};

var baseTransformShorthandValue = function baseTransformShorthandValue(propName, inputValue) {
  var ast = parse__default(inputValue.trim());
  var tokenStream = new TokenStream(ast.nodes);
  return transforms[propName](tokenStream);
};

var transformShorthandValue = process.env.NODE_ENV === 'production' ? baseTransformShorthandValue : function (propName, inputValue) {
  try {
    return baseTransformShorthandValue(propName, inputValue);
  } catch (e) {
    throw new Error('Failed to parse declaration "' + propName + ': ' + inputValue + '"');
  }
};

var getStylesForProperty = function getStylesForProperty(propName, inputValue, allowShorthand) {
  var isRawValue = allowShorthand === false || !(propName in transforms);
  var propValue = isRawValue ? transformRawValue(inputValue) : transformShorthandValue(propName, inputValue.trim());

  return propValue && propValue.$merge ? propValue.$merge : _defineProperty({}, propName, propValue);
};

var getPropertyName = camelizeStyleName;

var index = function index(rules) {
  var shorthandBlacklist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return rules.reduce(function (accum, rule) {
    var propertyName = getPropertyName(rule[0]);
    var value = rule[1];
    var allowShorthand = shorthandBlacklist.indexOf(propertyName) === -1;
    return Object.assign(accum, getStylesForProperty(propertyName, value, allowShorthand));
  }, {});
};

exports.transformRawValue = transformRawValue;
exports.getStylesForProperty = getStylesForProperty;
exports.getPropertyName = getPropertyName;
exports.default = index;
