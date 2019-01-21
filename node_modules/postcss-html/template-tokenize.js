"use strict";
const tokenize = require("postcss/lib/tokenize");

function templateTokenize () {
	const tokenizer = tokenize.apply(null, arguments);

	function nextToken () {
		let token = tokenizer.nextToken();
		if (token && token[0] === "{") {
			const returned = [token];
			let depth = 1;

			while ((token = tokenizer.nextToken())) {
				returned.push(token);
				if (token[0] !== "word") {
					if (token[0] === "{") {
						++depth;
					} else if (token[0] === "}" && --depth <= 0) {
						break;
					}
				}
			}

			const lastToken = returned[returned.length - 1];
			token = [
				"word",
				returned.map(token => token[1]).join(""),
				returned[0][2],
				returned[0][3],
				lastToken[2],
				lastToken[3],
			];
		}
		return token;
	}
	return Object.assign({}, tokenizer, {
		nextToken,
	});
}

module.exports = templateTokenize;
