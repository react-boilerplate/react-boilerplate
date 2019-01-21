"use strict";
const stringify = require("./stringify");
const parseStyle = require("./parse-style");

module.exports = (extract, defaultConfig) => {
	defaultConfig = defaultConfig || {
		postcss: "css",
		stylus: "css",
	};
	function parse (source, opts) {
		source = source.toString();
		if (!opts) {
			opts = {};
		}
		if (!opts.syntax) {
			opts.syntax = this;
		}
		return parseStyle(source, opts, extract(source, opts));
	}

	function initSyntax (syntax) {
		syntax.stringify = stringify.bind(syntax);
		syntax.parse = parse.bind(syntax);
		syntax.extract = extract.bind(syntax);
		return syntax;
	}

	function syntax (config) {
		return initSyntax({
			config: Object.assign({}, defaultConfig, config),
		});
	}

	initSyntax(syntax);
	syntax.config = defaultConfig;
	return syntax;
};
