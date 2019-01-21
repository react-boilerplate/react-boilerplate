'use strict';
var cloneRegexp = require('clone-regexp');

module.exports = function (input, str) {
	var match;
	var matches = [];
	var re = cloneRegexp(input);
	var isGlobal = re.global;

	while (match = re.exec(str)) {
		matches.push({
			match: match[0],
			sub: match.slice(1),
			index: match.index
		})

		if (!isGlobal) {
			break;
		}
	}

	return matches;
};
