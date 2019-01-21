"use strict";

const ObjectParser = require("./object-parser");
const Input = require("postcss/lib/input");

function objectParse (node, source, opts) {
	const input = new Input(source, opts);
	const parser = new ObjectParser(input);
	parser.parse(node);
	return parser.root;
}
module.exports = objectParse;
