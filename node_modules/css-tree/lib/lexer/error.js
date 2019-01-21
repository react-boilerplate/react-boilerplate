'use strict';

var createCustomError = require('../utils/createCustomError');
var translateGrammar = require('./grammar/translate');

function getLocation(node, point) {
    var loc = node && node.loc && node.loc[point];

    return loc
        ? { offset: loc.offset,
            line: loc.line,
            column: loc.column }
        : null;
}

var SyntaxReferenceError = function(type, referenceName) {
    var error = createCustomError('SyntaxReferenceError', type + ' `' + referenceName + '`');

    error.reference = referenceName;

    return error;
};

var MatchError = function(message, lexer, syntax, value, badNode) {
    var error = createCustomError('SyntaxMatchError', message);
    var errorOffset = -1;
    var start = getLocation(badNode, 'start');
    var end = getLocation(badNode, 'end');
    var css = lexer.syntax.translateMarkup(value, function(node, buffer) {
        if (node === badNode) {
            errorOffset = buffer.length;
        }
    });

    if (errorOffset === -1) {
        errorOffset = css.length;
    }

    error.rawMessage = message;
    error.syntax = syntax ? translateGrammar(syntax) : '<generic>';
    error.css = css;
    error.mismatchOffset = errorOffset;
    error.loc = {
        source: badNode && badNode.loc && badNode.loc.source || '<unknown>',
        start: start,
        end: end
    };
    error.line = start ? start.line : undefined;
    error.column = start ? start.column : undefined;
    error.offset = start ? start.offset : undefined;
    error.message = message + '\n' +
        '  syntax: ' + error.syntax + '\n' +
        '   value: ' + (error.css || '<empty string>') + '\n' +
        '  --------' + new Array(error.mismatchOffset + 1).join('-') + '^';

    return error;
};

module.exports = {
    SyntaxReferenceError: SyntaxReferenceError,
    MatchError: MatchError
};
