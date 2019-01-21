'use strict';

const MethodFactory = require('../lib/MethodFactory');

const defaults = {
  level: opts => `[${opts.level}]`,
  name: opts => opts.logger.name,
  template: '{{time}} {{level}} ',
  time: () => new Date().toTimeString().split(' ')[0]
};

module.exports = class PrefixFactory extends MethodFactory {
  constructor(logger, options) {
    super(logger);
    this.options = Object.assign({}, defaults, options);
  }

  interpolate(level) {
    return this.options.template.replace(/{{([^{}]*)}}/g, (stache, prop) => {
      const fn = this.options[prop];

      if (fn) {
        return fn({ level, logger: this.logger });
      }

      return stache;
    });
  }

  make(methodName) {
    const og = super.make(methodName);

    return (...args) => {
      const output = this.interpolate(methodName);
      const [first] = args;

      if (typeof first === 'string') {
        args[0] = output + first;
      } else {
        args.unshift(output);
      }

      og(...args);
    };
  }
};
