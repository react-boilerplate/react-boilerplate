'use strict';
const semverRegex = require('semver-regex');
const arrayUniq = require('array-uniq');

module.exports = (input, options = {}) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	const reLoose = new RegExp(`(?:${semverRegex().source})|(?:v?(?:\\d+\\.\\d+)(?:\\.\\d+)?)`, 'g');
	const matches = input.match(options.loose === true ? reLoose : semverRegex()) || [];

	return arrayUniq(matches.map(match => match.trim().replace(/^v/, '').replace(/^\d+\.\d+$/, '$&.0')));
};
