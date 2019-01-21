"use strict";

exports.__esModule = true;

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESERVED_KEYWORDS = ["none", "inherit", "initial", "unset"];

var cache = {};
var atRules = [];
var decls = [];

exports.default = {
    collect: function collect(node, encoder) {
        var name = node.name,
            prop = node.prop,
            type = node.type;


        if (type === 'atrule' && /keyframes/.test(name) && RESERVED_KEYWORDS.indexOf(node.params) === -1) {
            (0, _cache2.default)(node.params, encoder, cache);
            atRules.push(node);
        }

        if (type === 'decl' && /animation/.test(prop)) {
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