const color = require('kleur');
const Prompt = require('./prompt');
const { style, clear } = require('../util');
const { cursor, erase } = require('sisteransi');

/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 */
class TogglePrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active;
    this.inactive = opts.inactive;
    this.initialValue = this.value;
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
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }

  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }

  delete() {
    this.deactivate();
  }
  left() {
    this.deactivate();
  }
  right() {
    this.activate();
  }
  down() {
    this.deactivate();
  }
  up() {
    this.activate();
  }

  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.value = !this.value;
      this.render();
    } else if (c === '1') {
      this.value = true;
      this.render();
    } else if (c === '0') {
      this.value = false;
      this.render();
    } else return this.bell();
  }

  render(first) {
    if (first) this.out.write(cursor.hide);
	
	this.out.write(
      erase.lines(first ? 1 : this.msg.split(/\n/g).length) +
        cursor.to(0) +
        [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.value ? this.inactive : color.cyan.underline(this.inactive),
          color.gray('/'),
          this.value ? color.cyan.underline(this.active) : this.active
        ].join(' ')
    );
  }
}

module.exports = TogglePrompt;
