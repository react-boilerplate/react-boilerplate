'use strict';

const color = require('kleur');
const Prompt = require('./prompt');

var _require = require('sisteransi');

const cursor = _require.cursor,
      erase = _require.erase;

var _require2 = require('../util');

const style = _require2.style,
      clear = _require2.clear;


const isNumber = /[0-9]/;
const isValidChar = /\.|-/;
const isDef = any => any !== undefined;
const round = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 */
class NumberPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : '';
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.value = '';
    this.typed = '';
    this.lastHit = 0;
    this.render();
  }

  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(`${this.initial}`));
      this._value = '';
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v, this.round)}`);
      this._value = round(v, this.round);
    }
    this.fire();
  }

  get value() {
    return this._value;
  }

  parse(x) {
    return this.float ? parseFloat(x) : parseInt(x);
  }

  valid(c) {
    return c === '-' || c === '.' && this.float || isNumber.test(c);
  }

  reset() {
    this.typed = '';
    this.value = '';
    this.fire();
    this.render();
  }

  abort() {
    let x = this.value;
    this.value = x !== '' ? x : this.initial;
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    let x = this.value;
    this.value = x !== '' ? x : this.initial;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  up() {
    this.typed = '';
    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.fire();
    this.render();
  }

  down() {
    this.typed = '';
    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.fire();
    this.render();
  }

  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse(val = val.slice(0, -1)) || '';
    this.fire();
    this.render();
  }

  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (!this.valid(c)) return this.bell();

    const now = Date.now();
    if (now - this.lastHit > 1000) this.typed = ''; // 1s elapsed
    this.typed += c;
    this.lastHit = now;

    if (c === '.') return this.fire();

    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }

  render() {
    let underline = !this.done || !this.done && !this.placeholder;
    this.out.write(erase.line + cursor.to(0) + [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), underline ? color.cyan.underline(this.rendered) : this.rendered].join(' '));
  }
}

module.exports = NumberPrompt;