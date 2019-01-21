/*
- downloads archived binary from ngrok cdn (if not found in local cache)
- stores it in home dir as a local cache
- extracts executable to module's bin folder
*/

const os = require('os');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Zip = require('decompress-zip');
const request = require('request');
const {Transform} = require('stream');

const cdnUrl = getCdnUrl();
const cacheUrl = getCacheUrl();
const maxAttempts = 3;
let attempts = 0;

if (hasCache()) {
	console.log('ngrok - cached download found at ' + cacheUrl);
	extract(retry);
} else {
	download(retry);
}

function getCdnUrl() {
	const arch = process.env.NGROK_ARCH || (os.platform() + os.arch());
	const cdn = process.env.NGROK_CDN_URL || 'https://bin.equinox.io';
	const cdnPath = process.env.NGROK_CDN_PATH || '/c/4VmDzA7iaHb/ngrok-stable-';
	const cdnFiles = {
		darwinia32:	cdn + cdnPath + 'darwin-386.zip',
		darwinx64:	cdn + cdnPath + 'darwin-amd64.zip',
		linuxarm:		cdn + cdnPath + 'linux-arm.zip',
		linuxarm64:	cdn + cdnPath + 'linux-arm64.zip',
		linuxia32:	cdn + cdnPath + 'linux-386.zip',
		linuxx64:		cdn + cdnPath + 'linux-amd64.zip',
		win32ia32:	cdn + cdnPath + 'windows-386.zip',
		win32x64:		cdn + cdnPath + 'windows-amd64.zip',
		freebsdia32:cdn + cdnPath + 'freebsd-386.zip',
		freebsdx64:	cdn + cdnPath + 'freebsd-amd64.zip'
	};
	const url = cdnFiles[arch];
	if (!url) {
		console.error('ngrok - platform ' + arch + ' is not supported.');
		process.exit(1);
	}
	return url;
}

function getCacheUrl() {
	let dir;
	try {
		dir = path.join(os.homedir(), '.ngrok');
		if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
			fs.mkdirSync(dir);
		}
	} catch (err) {
		dir = path.join(__dirname, 'bin');
	}
	const name = new Buffer(cdnUrl).toString('base64');
	return path.join(dir, name + '.zip');
}

function hasCache() {
	return process.env.NGROK_IGNORE_CACHE !== 'true'
		&& fs.existsSync(cacheUrl)
		&& fs.statSync(cacheUrl).size;	
}

function download(cb) {
	console.log('ngrok - downloading binary ' + cdnUrl);

	const downloadStream = request
		.get(cdnUrl)
		.on('response', res => {
			if (!/2\d\d/.test(res.statusCode)) {
				res.pause();
				return downloadStream.emit('error', new Error('wrong status code: ' + res.statusCode));
			}
			const total = res.headers['content-length'];
			const progress = progressStream('ngrok - downloading progress: ', total);
			res.pipe(progress).pipe(outputStream);
		})
		.on('error', e => {
			console.warn('ngrok - error downloading binary', e);
			cb(e);
		});

	const outputStream = fs.createWriteStream(cacheUrl)
		.on('error', e => {
			console.log('ngrok - error storing binary to local file', e);
			cb(e);
		})
		.on('finish', () => {
			console.log('\nngrok - binary downloaded to ' + cacheUrl);
			extract(cb);
		});
}

function progressStream(msg, total) {
	let downloaded = 0;
	let shouldClearLine = false;
	const log = () => {
		if (shouldClearLine) {
			readline.clearLine(process.stdout);
			readline.cursorTo(process.stdout, 0);
		}
		let progress = downloaded + (total ? ('/' + total) : '');
		process.stdout.write(msg + progress);
		shouldClearLine = true;
	};
	if (total > 0) log();
	return new Transform({
		transform(data, enc, cb) {
			downloaded += data.length;
			log();
			cb(null, data);
		}
	});
}

function extract(cb) {
	console.log('ngrok - unpacking binary');
	const moduleBinPath = path.join(__dirname, 'bin');
	new Zip(cacheUrl).extract({path: moduleBinPath})
		.once('error', error)
		.once('extract', () => {
			const suffix = os.platform() === 'win32' ? '.exe' : '';
			if (suffix === '.exe') {
				fs.writeFileSync(path.join(moduleBinPath, 'ngrok.cmd'), 'ngrok.exe');
			}
			const target = path.join(moduleBinPath, 'ngrok' + suffix);
			fs.chmodSync(target, 0755);
			if (!fs.existsSync(target) || fs.statSync(target).size <= 0) {
				return error(new Error('corrupted file ' + target));
			}
			console.log('ngrok - binary unpacked to ' + target);
			cb(null);
		});

	function error(e) {
		console.warn('ngrok - error unpacking binary', e);
		cb(e);
	}
}

function retry(err) {
	attempts++;
	if (err && attempts === maxAttempts) {
		console.error('ngrok - install failed', err);
		return process.exit(1);
	}
	if (err) {
		console.warn('ngrok - install failed, retrying');
		return setTimeout(download, 500, retry);
	}
	process.exit(0);
}
