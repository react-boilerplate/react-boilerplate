'use strict';
const execa = require('execa');
const isPng = require('is-png');
const isStream = require('is-stream');
const pngquant = require('pngquant-bin');

module.exports = opts => input => {
	opts = Object.assign({}, opts);

	const isBuffer = Buffer.isBuffer(input);

	if (!isBuffer && !isStream(input)) {
		return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
	}

	if (isBuffer && !isPng(input)) {
		return Promise.resolve(input);
	}

	const args = ['-'];

	if (opts.floyd && typeof opts.floyd === 'number') {
		args.push(`--floyd=${opts.floyd}`);
	}

	if (opts.floyd && typeof opts.floyd === 'boolean') {
		args.push('--floyd');
	}

	if (opts.nofs) {
		args.push('--nofs');
	}

	if (opts.posterize) {
		args.push('--posterize', opts.posterize);
	}

	if (opts.quality) {
		args.push('--quality', opts.quality);
	}

	if (opts.speed) {
		args.push('--speed', opts.speed);
	}

	if (opts.verbose) {
		args.push('--verbose');
	}

	const cp = execa(pngquant, args, {
		encoding: null,
		input
	});

	const promise = cp
		.then(res => res.stdout)
		.catch(err => {
			if (err.code === 99) {
				return input;
			}

			err.message = err.stderr || err.message;
			throw err;
		});

	cp.stdout.then = promise.then.bind(promise);
	cp.stdout.catch = promise.catch.bind(promise);

	return cp.stdout;
};
