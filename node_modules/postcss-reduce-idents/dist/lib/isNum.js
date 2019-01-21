"use strict";

exports.__esModule = true;
exports.default = isNum;

var _postcssValueParser = require("postcss-value-parser");

function isNum(node) {
    return (0, _postcssValueParser.unit)(node.value);
}
module.exports = exports["default"];