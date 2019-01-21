'use strict';

const color = require('kleur');
const Prompt = require('./prompt');

var _require = require('../util');

const style = _require.style,
      clear = _require.clear,
      figures = _require.figures;

var _require2 = require('sisteransi');

const erase = _require2.erase,
      cursor = _require2.cursor;

/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 */

class SelectPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.cursor = opts.initial || 0;
    this.values = opts.choices || [];
    this.value = opts.choices[this.cursor].value;
    this.clear = clear('');
    this.render(true);
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.values[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
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

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.values.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.values.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.values.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  render(first) {
    if (first) this.out.write(cursor.hide);else this.out.write(erase.lines(this.values.length + 1));

    // Print prompt
    this.out.write([style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.values[this.cursor].title : color.gray(this.hint)].join(' '));

    // Print choices
    if (!this.done) {
      this.out.write('\n' + this.values.map((v, i) => {
        let title = this.cursor === i ? color.cyan.underline(v.title) : v.title;
        let prefix = this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ';
        return `${prefix} ${title}`;
      }).join('\n'));
    }
  }
}

module.exports = SelectPrompt;