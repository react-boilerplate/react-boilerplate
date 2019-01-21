'use strict';

const chalk = require('chalk');
const loglevel = require('loglevelnext'); //eslint-disable-line
const logSymbols = require('log-symbols');
const uuid = require('uuid/v4');

const symbols = {
  trace: chalk.grey('₸'),
  debug: chalk.cyan('➤'),
  info: logSymbols.info,
  warn: logSymbols.warning,
  error: logSymbols.error
};

const defaults = {
  name: '<unknown>',
  level: 'info',
  unique: true
};

const prefix = {
  level: opts => symbols[opts.level],
  template: `{{level}} ${chalk.gray('｢{{name}}｣')}: `
};

module.exports = function webpackLog(options) {
  const opts = Object.assign({}, defaults, options);
  const { id } = options;

  opts.prefix = Object.assign({}, prefix, options.prefix);
  delete opts.id;

  Object.defineProperty(opts, 'id', {
    get() {
      if (!id) {
        return this.name + (opts.unique ? `-${uuid()}` : '');
      }

      return id;
    }
  });

  if (opts.timestamp) {
    opts.prefix.template = `[{{time}}] ${opts.prefix.template}`;
  }

  const log = loglevel.getLogger(opts);

  if (!Object.prototype.hasOwnProperty.call(log, 'id')) {
    Object.defineProperty(log, 'id', {
      get() {
        return opts.id;
      }
    });
  }

  return log;
};

// NOTE: this is exported so that consumers of webpack-log can use the same
//       version of chalk to decorate log messages without incurring additional
//       dependency overhead. This is an atypical practice, but chalk version
//       segmentation is a common issue.
module.exports.chalk = chalk;

/**
 * @NOTE: This is an undocumented function solely for the purpose of tests.
 *        Do not use this method in production code. Using in production code
 *        may result in strange behavior.
 */
module.exports.delLogger = function delLogger(name) {
  delete loglevel.loggers[name];
};

module.exports.factories = loglevel.factories;
