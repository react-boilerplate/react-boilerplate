'use strict';
const bufferFrom = require('buffer-from');
const isSvg = require('is-svg');
const SVGO = require('svgo');

module.exports = opts => buf => {
	opts = Object.assign({multipass: true}, opts);

	if (!isSvg(buf)) {
		return Promise.resolve(buf);
	}

	if (Buffer.isBuffer(buf)) {
		buf = buf.toString();
	}

	const svgo = new SVGO(opts);

	// TODO: Use `Buffer.from` when targeting Node.js >=6
	return svgo.optimize(buf).then(res => bufferFrom(res.data));
};
