'use strict';
const pTimeout = require('p-timeout');

const symbolAsyncIterator = Symbol.asyncIterator || '@@asyncIterator';

const normalizeEmitter = emitter => {
	const addListener = emitter.on || emitter.addListener || emitter.addEventListener;
	const removeListener = emitter.off || emitter.removeListener || emitter.removeEventListener;

	if (!addListener || !removeListener) {
		throw new TypeError('Emitter is not compatible');
	}

	return {
		addListener: addListener.bind(emitter),
		removeListener: removeListener.bind(emitter)
	};
};

const multiple = (emitter, event, options) => {
	let cancel;
	const ret = new Promise((resolve, reject) => {
		options = Object.assign({
			rejectionEvents: ['error'],
			multiArgs: false,
			resolveImmediately: false
		}, options);

		if (!(options.count >= 0 && (options.count === Infinity || Number.isInteger(options.count)))) {
			throw new TypeError('The `count` option should be at least 0 or more');
		}

		const items = [];
		const {addListener, removeListener} = normalizeEmitter(emitter);

		const onItem = (...args) => {
			const value = options.multiArgs ? args : args[0];

			if (options.filter && !options.filter(value)) {
				return;
			}

			items.push(value);

			if (options.count === items.length) {
				cancel();
				resolve(items);
			}
		};

		const rejectHandler = error => {
			cancel();
			reject(error);
		};

		cancel = () => {
			removeListener(event, onItem);

			for (const rejectionEvent of options.rejectionEvents) {
				removeListener(rejectionEvent, rejectHandler);
			}
		};

		addListener(event, onItem);

		for (const rejectionEvent of options.rejectionEvents) {
			addListener(rejectionEvent, rejectHandler);
		}

		if (options.resolveImmediately) {
			resolve(items);
		}
	});

	ret.cancel = cancel;

	if (typeof options.timeout === 'number') {
		const timeout = pTimeout(ret, options.timeout);
		timeout.cancel = cancel;
		return timeout;
	}

	return ret;
};

module.exports = (emitter, event, options) => {
	if (typeof options === 'function') {
		options = {filter: options};
	}

	options = Object.assign({}, options, {
		count: 1,
		resolveImmediately: false
	});

	const arrayPromise = multiple(emitter, event, options);

	const promise = arrayPromise.then(array => array[0]);
	promise.cancel = arrayPromise.cancel;

	return promise;
};

module.exports.multiple = multiple;

module.exports.iterator = (emitter, event, options) => {
	if (typeof options === 'function') {
		options = {filter: options};
	}

	options = Object.assign({
		rejectionEvents: ['error'],
		resolutionEvents: [],
		multiArgs: false
	}, options);

	const {addListener, removeListener} = normalizeEmitter(emitter);

	let done = false;
	let error;
	let hasPendingError = false;
	const nextQueue = [];
	const valueQueue = [];

	const valueHandler = (...args) => {
		const value = options.multiArgs ? args : args[0];

		if (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();
			return resolve({done: false, value});
		}

		valueQueue.push(value);
	};

	const cancel = () => {
		done = true;
		removeListener(event, valueHandler);

		for (const rejectionEvent of options.rejectionEvents) {
			removeListener(rejectionEvent, rejectHandler);
		}

		for (const resolutionEvent of options.resolutionEvents) {
			removeListener(resolutionEvent, resolveHandler);
		}

		while (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();
			resolve({done: true, value: undefined});
		}
	};

	const rejectHandler = (...args) => {
		error = options.multiArgs ? args : args[0];

		if (nextQueue.length > 0) {
			const {reject} = nextQueue.shift();
			reject(error);
		} else {
			hasPendingError = true;
		}

		cancel();
	};

	const resolveHandler = (...args) => {
		const value = options.multiArgs ? args : args[0];

		if (options.filter && !options.filter(value)) {
			return;
		}

		if (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();
			resolve({done: true, value});
		} else {
			valueQueue.push(value);
		}

		cancel();
	};

	addListener(event, valueHandler);

	for (const rejectionEvent of options.rejectionEvents) {
		addListener(rejectionEvent, rejectHandler);
	}

	for (const resolutionEvent of options.resolutionEvents) {
		addListener(resolutionEvent, resolveHandler);
	}

	return {
		[symbolAsyncIterator]() {
			return this;
		},
		next() {
			if (valueQueue.length > 0) {
				const value = valueQueue.shift();
				return Promise.resolve({done: done && valueQueue.length === 0, value});
			}

			if (hasPendingError) {
				hasPendingError = false;
				return Promise.reject(error);
			}

			if (done) {
				return Promise.resolve({done: true, value: undefined});
			}

			return new Promise((resolve, reject) => nextQueue.push({resolve, reject}));
		},
		return(value) {
			cancel();
			return {done, value};
		}
	};
};
