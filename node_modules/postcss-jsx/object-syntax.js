"use strict";
const stringify = require("./object-stringify");
const parse = require("./object-parse");

module.exports = (node) => {
	const syntax = {
		stringify,
	};
	syntax.parse = parse.bind(null, node);
	return syntax;
};
