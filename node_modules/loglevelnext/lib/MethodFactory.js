'use strict';

const noop = () => {};
const levels = Symbol('valid log levels');
const instance = Symbol('a log instance');

module.exports = class MethodFactory {
  constructor(logger) {
    this[instance] = logger;
    this[levels] = {
      TRACE: 0,
      DEBUG: 1,
      INFO: 2,
      WARN: 3,
      ERROR: 4,
      SILENT: 5
    };
  }

  get levels() {
    return this[levels];
  }

  get logger() {
    return this[instance];
  }

  set logger(logger) {
    this[instance] = logger;
  }

  get methods() {
    return Object.keys(this.levels)
      .map(key => key.toLowerCase())
      .filter(key => key !== 'silent');
  }

  // eslint-disable-next-line class-methods-use-this
  bindMethod(obj, methodName) {
    const method = obj[methodName];
    if (typeof method.bind === 'function') {
      return method.bind(obj);
    }

    try {
      return Function.prototype.bind.call(method, obj);
    } catch (e) {
      // Missing bind shim or IE8 + Modernizr, fallback to wrapping
      return function result() {
        // eslint-disable-next-line prefer-rest-params
        return Function.prototype.apply.apply(method, [obj, arguments]);
      };
    }
  }

  distillLevel(level) {
    let result = level;

    if (typeof result === 'string' && typeof this.levels[result.toUpperCase()] !== 'undefined') {
      result = this.levels[result.toUpperCase()];
    }

    if (this.levelValid(result)) {
      return result;
    }
  }

  levelValid(level) {
    if (typeof level === 'number' && level >= 0 && level <= this.levels.SILENT) {
      return true;
    }

    return false;
  }

  /**
   * Build the best logging method possible for this env
   * Wherever possible we want to bind, not wrap, to preserve stack traces.
   * Since we're targeting modern browsers, there's no need to wait for the
   * console to become available.
   */
  // eslint-disable-next-line class-methods-use-this
  make(methodName) {
    if (methodName === 'debug') {
      methodName = 'log';
    }

    /* eslint-disable no-console */
    if (typeof console[methodName] !== 'undefined') {
      return this.bindMethod(console, methodName);
    } else if (typeof console.log !== 'undefined') {
      return this.bindMethod(console, 'log');
    }

    /* eslint-enable no-console */
    return noop;
  }

  replaceMethods(logLevel) {
    const level = this.distillLevel(logLevel);

    if (level == null) {
      throw new Error(`loglevelnext: replaceMethods() called with invalid level: ${logLevel}`);
    }

    if (!this.logger || this.logger.type !== 'LogLevel') {
      throw new TypeError('loglevelnext: Logger is undefined or invalid. Please specify a valid Logger instance.');
    }

    this.methods.forEach((methodName) => {
      const { [methodName.toUpperCase()]: methodLevel } = this.levels;

      this.logger[methodName] = (methodLevel < level) ? noop : this.make(methodName);
    });

    // Define log.log as an alias for log.debug
    this.logger.log = this.logger.debug;
  }
};
