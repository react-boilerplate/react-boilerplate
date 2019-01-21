'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (message) {
    var ast = (0, _intlMessageformatParser.parse)(message);
    return printICUMessage(ast);
};

var _intlMessageformatParser = require('intl-messageformat-parser');

var ESCAPED_CHARS = {
    '\\': '\\\\',
    '\\#': '\\#',
    '{': '\\{',
    '}': '\\}'
}; /*
    * Copyright 2015, Yahoo Inc.
    * Copyrights licensed under the New BSD License.
    * See the accompanying LICENSE file for terms.
    */

var ESAPE_CHARS_REGEXP = /\\#|[{}\\]/g;

function printICUMessage(ast) {
    var printedNodes = ast.elements.map(function (node) {
        if (node.type === 'messageTextElement') {
            return printMessageTextASTNode(node);
        }

        if (!node.format) {
            return '{' + node.id + '}';
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
        ordinal = format.ordinal;

    // Special-case ordinal plurals to use `selectordinal` instead of `plural`.

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
    var style = format.style ? ', ' + format.style : '';

    return '{' + id + ', ' + argumentType + style + '}';
}

function printOptionalFormatASTNode(_ref3) {
    var id = _ref3.id,
        format = _ref3.format;

    var argumentType = getArgumentType(format);
    var offset = format.offset ? ', offset:' + format.offset : '';

    var options = format.options.map(function (option) {
        var optionValue = printICUMessage(option.value);
        return ' ' + option.selector + ' {' + optionValue + '}';
    });

    return '{' + id + ', ' + argumentType + offset + ',' + options.join('') + '}';
}