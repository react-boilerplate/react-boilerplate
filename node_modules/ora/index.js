'use strict';
var chalk = require('chalk');
var cliCursor = require('cli-cursor');
var cliSpinners = require('cli-spinners');
var objectAssign = require('object-assign');

function Ora(options) {
	if (!(this instanceof Ora)) {
		return new Ora(options);
	}

	if (typeof options === 'string') {
		options = {
			text: options
		};
	}

	this.options = objectAssign({
		text: '',
		color: 'cyan',
		stream: process.stderr
	}, options);

	var sp = this.options.spinner;
	this.spinner = typeof sp === 'object' ? sp : (process.platform === 'win32' ? cliSpinners.line : (cliSpinners[sp] || cliSpinners.dots)); // eslint-disable-line

	if (this.spinner.frames === undefined) {
		throw new Error('Spinner must define `frames`');
	}

	this.text = this.options.text;
	this.color = this.options.color;
	this.interval = this.options.interval || this.spinner.interval || 100;
	this.stream = this.options.stream;
	this.id = null;
	this.frameIndex = 0;
	this.enabled = this.options.enabled || ((this.stream && this.stream.isTTY) && !process.env.CI);
}

Ora.prototype.frame = function () {
	var frames = this.spinner.frames;
	var frame = frames[this.frameIndex];

	if (this.color) {
		frame = chalk[this.color](frame);
	}

	this.frameIndex = ++this.frameIndex % frames.length;

	return frame + ' ' + this.text;
};

Ora.prototype.clear = function () {
	if (!this.enabled) {
		return this;
	}

	this.stream.clearLine();
	this.stream.cursorTo(0);

	return this;
};

Ora.prototype.render = function () {
	this.clear();
	this.stream.write(this.frame());

	return this;
};

Ora.prototype.start = function () {
	if (!this.enabled || this.id) {
		return this;
	}

	cliCursor.hide();
	this.render();
	this.id = setInterval(this.render.bind(this), this.interval);

	return this;
};

Ora.prototype.stop = function () {
	if (!this.enabled) {
		return this;
	}

	clearInterval(this.id);
	this.id = null;
	this.frameIndex = 0;
	this.clear();
	cliCursor.show();

	return this;
};

module.exports = Ora;
