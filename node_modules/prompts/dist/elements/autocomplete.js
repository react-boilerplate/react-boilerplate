'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const util = require('../util');
const color = require('kleur');
const Prompt = require('./prompt');

var _require = require('sisteransi');

const cursor = _require.cursor;

// Get value, with fallback to title

const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 */
class AutocompletePrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = opts.initial;
    this.cursor = opts.initial || opts.cursor || 0;
    this.fallback = opts.fallback || opts.initial !== void 0 ? `${util.figures.pointerSmall} ${getVal(this.choices, this.initial)}` : `${util.figures.pointerSmall} no matches found`;
    this.suggestions = [];
    this.input = '';
    this.limit = opts.limit || 10;
    this.transform = util.style.render(opts.style);
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = util.clear('');
    this.complete(this.render);
    this.render(true);
  }

  moveCursor(i) {
    this.cursor = i;
    if (this.suggestions.length > 0) this.value = getVal(this.suggestions, i);else this.value = this.initial !== void 0 ? getVal(this.choices, this.initial) : null;
    this.fire();
  }

  complete(cb) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const p = _this.completing = _this.suggest(_this.input, _this.choices);
      const suggestions = yield p;

      if (_this.completing !== p) return;

      _this.suggestions = suggestions.slice(0, _this.limit).map(function (s) {
        return util.strip(s);
      });
      _this.completing = false;

      const l = Math.max(suggestions.length - 1, 0);
      _this.moveCursor(Math.min(l, _this.cursor));

      cb && cb();
    })();
  }

  reset() {
    this.input = '';
    this.complete(() => {
      this.moveCursor(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
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

  _(c, key) {
    this.input += c;
    this.complete(this.render);
    this.render();
  }

  delete() {
    if (this.input.length === 0) return this.bell();
    this.input = this.input.slice(0, -1);
    this.complete(this.render);
    this.render();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.suggestions.length - 1);
    this.render();
  }

  up() {
    if (this.cursor <= 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor >= this.suggestions.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.suggestions.length);
    this.render();
  }

  render(first) {
    if (first) this.out.write(cursor.hide);

    let prompt = [util.style.symbol(this.done, this.aborted), this.msg, util.style.delimiter(this.completing), this.done && this.suggestions[this.cursor] ? this.suggestions[this.cursor].title : this.transform.render(this.input)].join(' ');

    if (!this.done) {
      let suggestions = this.suggestions.map((item, i) => `\n${i === this.cursor ? color.cyan(item.title) : item.title}`);

      prompt += suggestions.length ? suggestions.reduce((acc, line) => acc + line, '') : `\n${color.gray(this.fallback)}`;
    }

    this.out.write(this.clear + prompt);
    this.clear = util.clear(prompt);
  }
}

module.exports = AutocompletePrompt;