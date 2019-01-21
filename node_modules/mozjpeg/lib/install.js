'use strict';
const os = require('os');
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

const cpuNum = os.cpus().length;

bin.run(['-version'], err => {
	if (err) {
		log.warn(err.message);
		log.warn('mozjpeg pre-build test failed');
		log.info('compiling from source');

		let cfgExtras = '';
		if (process.platform === 'darwin') {
			cfgExtras = 'libpng_LIBS=\'/usr/local/lib/libpng16.a -lz\' --enable-static';
		}

		const cfg = [
			`./configure --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
			`--prefix="${bin.dest()}" --bindir="${bin.dest()}" --libdir="${bin.dest()}"`
		].join(' ');

		const builder = new BinBuild()
			.src('https://github.com/mozilla/mozjpeg/releases/download/v3.2/mozjpeg-3.2-release-source.tar.gz')
			.cmd('autoreconf -fiv')
			.cmd(cfg)
			.cmd(`make -j${cpuNum}`)
			.cmd(`make install -j${cpuNum}`);

		return builder.run(err => {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('mozjpeg built successfully');
		});
	}

	log.success('mozjpeg pre-build test passed successfully');
});
