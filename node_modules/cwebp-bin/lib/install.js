'use strict';
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-version'], err => {
	if (err) {
		log.warn(err.message);
		log.warn('cwebp pre-build test failed');
		log.info('compiling from source');

		const builder = new BinBuild()
			.src('http://downloads.webmproject.org/releases/webp/libwebp-0.6.1.tar.gz')
			.cmd(`./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`)
			.cmd('make && make install');

		return builder.run(err => {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('cwebp built successfully');
		});
	}

	log.success('cwebp pre-build test passed successfully');
});
