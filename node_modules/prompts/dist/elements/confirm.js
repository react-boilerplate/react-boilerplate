'use strict';

const color = require('kleur');
const Prompt = require('./prompt');

var _require = require('../util');

const style = _require.style,
      clear = _require.clear;

var _require2 = require('sisteransi');

const erase = _require2.erase,
      cursor = _require2.cursor;

/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 */

class ConfirmPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.render(true);
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    if (c.toLowerCase() === 'y') {
      this.value = true;
      return this.submit();
    }
    if (c.toLowerCase() === 'n') {
      this.value = false;
      return this.submit();
    }
    return this.bell();
  }

  render(first) {
    if (first) this.out.write(cursor.hide);
    this.out.write(erase.line + cursor.to(0) + [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? 'yes' : 'no' : color.gray(this.initialValue ? '(Y/n)' : '(y/N)')].join(' '));
  }
}

module.exports = ConfirmPrompt;