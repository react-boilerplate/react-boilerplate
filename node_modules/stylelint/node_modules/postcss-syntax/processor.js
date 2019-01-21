"use strict";

const parseStyle = require("./parse-style");

function processor (source, rules, opts) {
	rules = rules && rules.filter(rule => rule.extract).map(rule => {
		if (typeof rule.extract === "string") {
			rule.extract = rule.extract.toLowerCase().replace(/^(postcss-)?/i, "postcss-");
			rule.extract = require(rule.extract + "/extract");
		}
		return rule;
	});

	if (!rules || !rules.length) {
		return;
	}
	const styles = rules.reduce(
		(styles, rule) => (
			rule.extract(source, Object.assign({}, opts, rule.opts), styles) || styles
		),
		[]
	);

	return parseStyle(source, opts, styles);
}

module.exports = processor;
