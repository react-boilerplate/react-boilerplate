"use strict";
const stringify = require("./stringify");
const parse = require("./parse");

const defaultConfig = {
	postcss: "css",
	stylus: "css",
	babel: "jsx",
	xml: "html",
};

try {
	require.resolve("postcss-jsx");
} catch (ex) {
	defaultConfig.jsx = "styled";
}

function initSyntax (syntax) {
	syntax.stringify = stringify.bind(syntax);
	syntax.parse = parse.bind(syntax);
	return syntax;
}

function syntax (config) {
	return initSyntax({
		config: Object.assign({}, defaultConfig, config),
	});
}

initSyntax(syntax);
syntax.config = defaultConfig;
module.exports = syntax;
