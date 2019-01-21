/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

exports.notBailing = (options) => {
	const args = options.args.join(", ");
	const argsWithCallback = args ? `${args}, _callback` : "_callback";
	const argsWithComma = args ? `${args}, ` : "";
	const tap = options.tap;
	const type = options.type;
	switch(`${tap} ${type}`) {
		case "none async":
			return `function(${argsWithCallback}) {
				_callback();
			}`;
		case "none promise":
			return `function(${args}) {
				return Promise.resolve();
			}`;
		case "sync async":
			return `function(${argsWithCallback}) {
				try {
					this._x(${args});
				} catch(_e) {
					_callback(_e);
					return;
				}
				_callback();
			}`;
		case "sync promise":
			return `function(${args}) {
				return Promise.resolve().then(() => {
					this._x(${args});
				});
			}`;
		case "async async":
			return `function(${argsWithCallback}) {
				this._x(${argsWithComma}(_err) => {
					if(_err) {
						_callback(_err);
						return;
					}
					_callback();
				});
			}`;
		case "async promise":
			return `function(${args}) {
				return new Promise((_resolve, _reject) => {
					let _isSync = true;
					this._x(${argsWithComma}_err => {
						if(_err) {
							if(_isSync)
								Promise.resolve().then(() => _reject(_err));
							else
								_reject(_err);
							return;
						}
						_resolve();
					});
					_isSync = false;
				});
			}`;
		case "promise async":
			return `function(${argsWithCallback}) {
				Promise.resolve(this._x(${args})).then(() => {
					_callback();
				}, _err => {
					_callback(_err);
				});
			}`;
		case "promise promise":
			return `function(${args}) {
				return Promise.resolve(this._x(${args})).then(() => {});
			}`;
		case "multiple-sync async":
			return `function(${argsWithCallback}) {
				try {
					const _fns = this._x;
					for(let _i = 0; _i < _fns.length; _i++) {
						_fns[_i](${args});
					}
				} catch(_err) {
					_callback(_err);
					return;
				}
				_callback();
			}`;
		case "multiple-sync promise":
			return `function(${args}) {
				return Promise.resolve().then(() => {
					const _fns = this._x;
					for(let _i = 0; _i < _fns.length; _i++) {
						_fns[_i](${args});
					}
				});
			}`;
	}
}

exports.bailing = (options) => {
	const args = options.args.join(", ");
	const argsWithCallback = args ? `${args}, _callback` : "_callback";
	const argsWithComma = args ? `${args}, ` : "";
	const tap = options.tap;
	const type = options.type;
	switch(`${tap} ${type}`) {
		case "none async":
			return `function(${argsWithCallback}) {
				_callback();
			}`;
		case "none promise":
			return `function(${args}) {
				return Promise.resolve();
			}`;
		case "sync async":
			return `function(${argsWithCallback}) {
				let _result;
				try {
					_result = this._x(${args});
				} catch(_e) {
					_callback(_e);
					return;
				}
				_callback(null, _result);
			}`;
		case "sync promise":
			return `function(${args}) {
				return Promise.resolve().then(() => this._x(${args}));
			}`;
		case "async async":
			return `function(${argsWithCallback}) {
				this._x(${argsWithCallback});
			}`;
		case "async promise":
			return `function(${args}) {
				return new Promise((_resolve, _reject) => {
					let _isSync = true;
					this._x(${argsWithComma}(_err, _result) => {
						if(_err) {
							if(_isSync)
								Promise.resolve().then(() => _reject(_err));
							else
								_reject(_err);
							return;
						}
						_resolve(_result);
					});
					_isSync = false;
				});
			}`;
		case "promise async":
			return `function(${argsWithCallback}) {
				Promise.resolve(this._x(${args})).then(_result => {
					_callback(null, _result);
				}, _err => {
					_callback(_err);
				});
			}`;
		case "promise promise":
			return `function(${args}) {
				return this._x(${args});
			}`;
		case "multiple-sync async":
			return `function(${argsWithCallback}) {
				try {
					const _fns = this._x;
					for(let _i = 0; _i < _fns.length; _i++) {
						const _result = _fns[_i](${args});
						if(_result !== undefined) {
							_callback(null, _result);
							return;
						}
					}
				} catch(_err) {
					_callback(_err);
					return;
				}
				_callback();
			}`;
		case "multiple-sync promise":
			return `function(${args}) {
				return new Promise(_resolve => {
					const _fns = this._x;
					for(let _i = 0; _i < _fns.length; _i++) {
						const _result = _fns[_i](${args});
						if(_result !== undefined) {
							_resolve(_result);
							return;
						}
					}
					_resolve();
				});
			}`;
	}
}
