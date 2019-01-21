"use strict";

const parser = require("./parser");
const processor = require("./processor");

function parse (source, opts) {
	if (!opts) {
		opts = {};
	}
	if (!opts.syntax) {
		opts.syntax = this;
	}
	let rules = opts.syntax.config.rules;
	const file = opts.from ? opts.from.replace(/^(\w+:\/\/.*?\.\w+)(?:[?#].*)?$/, "$1") : "";
	rules = rules && rules.filter(
		rule => rule.test.test(file)
	);
	source = source.toString();
	return processor(source, rules, opts) || parser(source, rules, opts);
}

module.exports = parse;
