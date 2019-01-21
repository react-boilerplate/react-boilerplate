'use strict';
var isRegexp = require('is-regexp');
var isSupportedRegexpFlag = require('is-supported-regexp-flag');

var flagMap = {
	global: 'g',
	ignoreCase: 'i',
	multiline: 'm'
};

if (isSupportedRegexpFlag('y')) {
	flagMap.sticky = 'y';
}

if (isSupportedRegexpFlag('u')) {
	flagMap.unicode = 'u';
}

module.exports = function (re, opts) {
	if (!isRegexp(re)) {
		throw new TypeError('Expected a RegExp instance');
	}

	opts = opts || {};

	var flags = Object.keys(flagMap).map(function (el) {
		return (typeof opts[el] === 'boolean' ? opts[el] : re[el]) ? flagMap[el] : '';
	}).join('');

	return new RegExp(opts.source || re.source, flags);
};
