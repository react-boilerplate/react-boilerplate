"use strict";

exports.__esModule = true;

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESERVED_KEYWORDS = ["unset", "initial", "inherit", "none", "inline", "outside", "disc", "circle", "square", "decimal", "cjk-decimal", "decimal-leading-zero", "lower-roman", "upper-roman", "lower-greek", "lower-alpha", "lower-latin", "upper-alpha", "upper-latin", "arabic-indic", "armenian", "bengali", "cambodian", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "devanagari", "ethiopic-numeric", "georgian", "gujarati", "gurmukhi", "hebrew", "hiragana", "hiragana-iroha", "japanese-formal", "japanese-informal", "kannada", "katakana", "katakana-iroha", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "lao", "lower-armenian", "malayalam", "mongolian", "myanmar", "oriya", "persian", "simp-chinese-formal", "simp-chinese-informal", "tamil", "telugu", "thai", "tibetan", "trad-chinese-formal", "trad-chinese-informal", "upper-armenian", "disclosure-open", "disclosure-close"];

var cache = {};
var atRules = [];
var decls = [];

exports.default = {
    collect: function collect(node, encoder) {
        var name = node.name,
            prop = node.prop,
            type = node.type;


        if (type === 'atrule' && /counter-style/.test(name) && RESERVED_KEYWORDS.indexOf(node.params) === -1) {
            (0, _cache2.default)(node.params, encoder, cache);
            atRules.push(node);
        }

        if (type === 'decl' && /(list-style|system)/.test(prop)) {
            decls.push(node);
        }
    },
    transform: function transform() {
        // Iterate each property and change their names
        decls.forEach(function (decl) {
            decl.value = (0, _postcssValueParser2.default)(decl.value).walk(function (node) {
                if (node.type === 'word' && node.value in cache) {
                    cache[node.value].count++;
                    node.value = cache[node.value].ident;
                } else if (node.type === 'space') {
                    node.value = ' ';
                } else if (node.type === 'div') {
                    node.before = node.after = '';
                }
            }).toString();
        });
        // Iterate each at rule and change their name if references to them have been found
        atRules.forEach(function (rule) {
            var cached = cache[rule.params];
            if (cached && cached.count > 0) {
                rule.params = cached.ident;
            }
        });

        // reset cache after transform
        cache = {};
        atRules = [];
        decls = [];
    }
};
module.exports = exports["default"];