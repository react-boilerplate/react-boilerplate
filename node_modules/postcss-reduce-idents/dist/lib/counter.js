"use strict";

exports.__esModule = true;

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

var _isNum = require("./isNum");

var _isNum2 = _interopRequireDefault(_isNum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESERVED_KEYWORDS = ["unset", "initial", "inherit", "none"];

var cache = {};
var declOneCache = [];
var declTwoCache = [];

exports.default = {
    collect: function collect(node, encoder) {
        var prop = node.prop,
            type = node.type;


        if (type !== 'decl') {
            return;
        }

        if (/counter-(reset|increment)/.test(prop)) {
            node.value = (0, _postcssValueParser2.default)(node.value).walk(function (child) {
                if (child.type === 'word' && !(0, _isNum2.default)(child) && RESERVED_KEYWORDS.indexOf(child.value) === -1) {
                    (0, _cache2.default)(child.value, encoder, cache);
                    child.value = cache[child.value].ident;
                }

                if (child.type === 'space') {
                    child.value = ' ';
                }
            });
            declOneCache.push(node);
        } else if (/content/.test(prop)) {
            declTwoCache.push(node);
        }
    },
    transform: function transform() {
        declTwoCache.forEach(function (decl) {
            decl.value = (0, _postcssValueParser2.default)(decl.value).walk(function (node) {
                var type = node.type,
                    value = node.value;

                if (type === 'function' && (value === 'counter' || value === 'counters')) {
                    (0, _postcssValueParser.walk)(node.nodes, function (child) {
                        if (child.type === 'word' && child.value in cache) {
                            cache[child.value].count++;
                            child.value = cache[child.value].ident;
                        } else if (child.type === 'div') {
                            child.before = child.after = '';
                        }
                    });
                }
                if (type === 'space') {
                    node.value = ' ';
                }
                return false;
            }).toString();
        });
        declOneCache.forEach(function (decl) {
            decl.value = decl.value.walk(function (node) {
                if (node.type === 'word' && !(0, _isNum2.default)(node)) {
                    Object.keys(cache).forEach(function (key) {
                        var cached = cache[key];
                        if (cached.ident === node.value && !cached.count) {
                            node.value = key;
                        }
                    });
                }
            }).toString();
        });

        // reset cache after transform
        cache = {};
        declOneCache = [];
        declTwoCache = [];
    }
};
module.exports = exports["default"];