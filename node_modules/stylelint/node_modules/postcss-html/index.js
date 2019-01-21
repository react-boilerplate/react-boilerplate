"use strict";
const extract = require("./extract");
const syntax = require("postcss-syntax/syntax")(extract);

module.exports = syntax;
