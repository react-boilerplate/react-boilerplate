/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class AsyncSeriesLoopHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsLooping({
			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}

const factory = new AsyncSeriesLoopHookCodeFactory();

class AsyncSeriesLoopHook extends Hook {
	constructor(args) {
		super(args);
		this.call = this._call = undefined;
	}

	compile(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
}

module.exports = AsyncSeriesLoopHook;
