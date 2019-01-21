"use strict";
const tokenize = require("postcss/lib/tokenize");

function templateTokenize () {
	const tokenizer = tokenize.apply(null, arguments);

	function nextToken () {
		const token = tokenizer.nextToken();
		if (token && token[0] === "word" && /(\\*)\$$/.test(token[1]) && !(RegExp.$1.length % 2)) {
			let next = tokenizer.nextToken();
			if (next[0] === "{" && next[2] === token[4] && next[3] === token[5] + 1) {
				do {
					token[1] += next[1];
					token[4] = next[4];
					token[5] = next[5];
					if (next[0] === "}") {
						break;
					}
				} while ((next = tokenizer.nextToken()));
			} else {
				tokenizer.back(next);
			}
		}
		return token;
	}
	return Object.assign({}, tokenizer, {
		nextToken,
	});
}

module.exports = templateTokenize;
