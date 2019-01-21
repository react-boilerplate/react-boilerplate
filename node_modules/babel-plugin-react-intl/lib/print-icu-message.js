"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _intlMessageformatParser = require("intl-messageformat-parser");

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var ESCAPED_CHARS = {
  '\\': '\\\\',
  '\\#': '\\#',
  '{': '\\{',
  '}': '\\}'
};
var ESAPE_CHARS_REGEXP = /\\#|[{}\\]/g;

function _default(message) {
  var ast = (0, _intlMessageformatParser.parse)(message);
  return printICUMessage(ast);
}

function printICUMessage(ast) {
  var printedNodes = ast.elements.map(function (node) {
    if (node.type === 'messageTextElement') {
      return printMessageTextASTNode(node);
    }

    if (!node.format) {
      return "{".concat(node.id, "}");
    }

    switch (getArgumentType(node.format)) {
      case 'number':
      case 'date':
      case 'time':
        return printSimpleFormatASTNode(node);

      case 'plural':
      case 'selectordinal':
      case 'select':
        return printOptionalFormatASTNode(node);
    }
  });
  return printedNodes.join('');
}

function getArgumentType(format) {
  var type = format.type,
      ordinal = format.ordinal; // Special-case ordinal plurals to use `selectordinal` instead of `plural`.

  if (type === 'pluralFormat' && ordinal) {
    return 'selectordinal';
  }

  return type.replace(/Format$/, '').toLowerCase();
}

function printMessageTextASTNode(_ref) {
  var value = _ref.value;
  return value.replace(ESAPE_CHARS_REGEXP, function (char) {
    return ESCAPED_CHARS[char];
  });
}

function printSimpleFormatASTNode(_ref2) {
  var id = _ref2.id,
      format = _ref2.format;
  var argumentType = getArgumentType(format);
  var style = format.style ? ", ".concat(format.style) : '';
  return "{".concat(id, ", ").concat(argumentType).concat(style, "}");
}

function printOptionalFormatASTNode(_ref3) {
  var id = _ref3.id,
      format = _ref3.format;
  var argumentType = getArgumentType(format);
  var offset = format.offset ? ", offset:".concat(format.offset) : '';
  var options = format.options.map(function (option) {
    var optionValue = printICUMessage(option.value);
    return " ".concat(option.selector, " {").concat(optionValue, "}");
  });
  return "{".concat(id, ", ").concat(argumentType).concat(offset, ",").concat(options.join(''), "}");
}