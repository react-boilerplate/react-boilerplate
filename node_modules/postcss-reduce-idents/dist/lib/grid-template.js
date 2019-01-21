"use strict";

exports.__esModule = true;

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

var _isNum = require("./isNum");

var _isNum2 = _interopRequireDefault(_isNum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESERVED_KEYWORDS = ["auto", "span", "inherit", "initial", "unset"];

var cache = {};
var declCache = [];

exports.default = {
    collect: function collect(node, encoder) {
        if (node.type !== 'decl') {
            return;
        }

        if (/(grid-template|grid-template-areas)/.test(node.prop)) {
            (0, _postcssValueParser2.default)(node.value).walk(function (child) {
                if (child.type === 'string') {
                    child.value.split(/\s+/).forEach(function (word) {
                        if (/\.+/.test(word)) {
                            // reduce empty zones to a single `.`
                            node.value = node.value.replace(word, ".");
                        } else if (word && RESERVED_KEYWORDS.indexOf(word) === -1) {
                            (0, _cache2.default)(word, encoder, cache);
                        }
                    });
                }
            });
            declCache.push(node);
        } else if (node.prop === 'grid-area') {
            (0, _postcssValueParser2.default)(node.value).walk(function (child) {
                if (child.type === 'word' && RESERVED_KEYWORDS.indexOf(child.value) === -1) {
                    (0, _cache2.default)(child.value, encoder, cache);
                }
            });
            declCache.push(node);
        }
    },
    transform: function transform() {
        declCache.forEach(function (decl) {
            decl.value = (0, _postcssValueParser2.default)(decl.value).walk(function (node) {
                if (/(grid-template|grid-template-areas)/.test(decl.prop)) {
                    node.value.split(/\s+/).forEach(function (word) {
                        if (word in cache) {
                            node.value = node.value.replace(word, cache[word].ident);
                        }
                    });
                    node.value = node.value.replace(/\s+/g, " "); // merge white-spaces
                }
                if (decl.prop === 'grid-area' && !(0, _isNum2.default)(node)) {
                    if (node.value in cache) {
                        node.value = cache[node.value].ident;
                    }
                }
                return false;
            }).toString();
        });

        // reset cache after transform
        cache = {};
        declCache = [];
    }
};
module.exports = exports["default"];