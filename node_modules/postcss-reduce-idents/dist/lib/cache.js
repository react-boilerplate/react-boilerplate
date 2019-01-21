"use strict";

exports.__esModule = true;

exports.default = function (value, encoder, cache) {
    if (cache[value]) {
        return;
    }
    cache[value] = {
        ident: encoder(value, Object.keys(cache).length),
        count: 0
    };
};

module.exports = exports["default"];