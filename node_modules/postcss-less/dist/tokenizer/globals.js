'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var singleQuote = exports.singleQuote = '\''.charCodeAt(0);
var doubleQuote = exports.doubleQuote = '"'.charCodeAt(0);
var backslash = exports.backslash = '\\'.charCodeAt(0);
var backTick = exports.backTick = '`'.charCodeAt(0);
var slash = exports.slash = '/'.charCodeAt(0);
var newline = exports.newline = '\n'.charCodeAt(0);
var space = exports.space = ' '.charCodeAt(0);
var feed = exports.feed = '\f'.charCodeAt(0);
var tab = exports.tab = '\t'.charCodeAt(0);
var carriageReturn = exports.carriageReturn = '\r'.charCodeAt(0);
var openedParenthesis = exports.openedParenthesis = '('.charCodeAt(0);
var closedParenthesis = exports.closedParenthesis = ')'.charCodeAt(0);
var openedCurlyBracket = exports.openedCurlyBracket = '{'.charCodeAt(0);
var closedCurlyBracket = exports.closedCurlyBracket = '}'.charCodeAt(0);
var openSquareBracket = exports.openSquareBracket = '['.charCodeAt(0);
var closeSquareBracket = exports.closeSquareBracket = ']'.charCodeAt(0);
var semicolon = exports.semicolon = ';'.charCodeAt(0);
var asterisk = exports.asterisk = '*'.charCodeAt(0);
var colon = exports.colon = ':'.charCodeAt(0);
var comma = exports.comma = ','.charCodeAt(0);
var dot = exports.dot = '.'.charCodeAt(0);
var atRule = exports.atRule = '@'.charCodeAt(0);
var tilde = exports.tilde = '~'.charCodeAt(0);
var hash = exports.hash = '#'.charCodeAt(0);

var atEndPattern = exports.atEndPattern = /[ \n\t\r\f\{\(\)'"\\;/\[\]#]/g;
var wordEndPattern = exports.wordEndPattern = /[ \n\t\r\f\(\)\{\}:,;@!'"\\\]\[#]|\/(?=\*)/g;
var badBracketPattern = exports.badBracketPattern = /.[\\\/\("'\n]/;

var pageSelectorPattern = exports.pageSelectorPattern = /^@page[^\w-]+/;
var variableSpaceColonPattern = exports.variableSpaceColonPattern = /^\s*:/;
var variablePattern = exports.variablePattern = /^@[^:\(\{]+:/;
var hashColorPattern = exports.hashColorPattern = /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/;