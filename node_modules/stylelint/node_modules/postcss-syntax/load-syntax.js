"use strict";
const getSyntax = require("./get-syntax");
const cache = {};

function loadSyntax (opts, id) {
	const cssSyntax = getSyntax("css", opts);
	const modulePath = id + "/template-" + (cssSyntax.parse.name === "safeParse" ? "safe-" : "") + "parse";
	let syntax = cache[modulePath];
	if (!syntax) {
		syntax = {
			parse: require(modulePath),
			stringify: cssSyntax.stringify,
		};
		cache[modulePath] = syntax;
	}
	return syntax;
}

module.exports = loadSyntax;
