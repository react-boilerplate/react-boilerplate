"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _trimRight() {
  const data = _interopRequireDefault(require("trim-right"));

  _trimRight = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SPACES_RE = /^[ \t]+$/;

class Buffer {
  constructor(map) {
    this._map = null;
    this._buf = [];
    this._last = "";
    this._queue = [];
    this._position = {
      line: 1,
      column: 0
    };
    this._sourcePosition = {
      identifierName: null,
      line: null,
      column: null,
      filename: null
    };
    this._map = map;
  }

  get() {
    this._flush();

    const map = this._map;
    const result = {
      code: (0, _trimRight().default)(this._buf.join("")),
      map: null,
      rawMappings: map && map.getRawMappings()
    };

    if (map) {
      Object.defineProperty(result, "map", {
        configurable: true,
        enumerable: true,

        get() {
          return this.map = map.get();
        },

        set(value) {
          Object.defineProperty(this, "map", {
            value,
            writable: true
          });
        }

      });
    }

    return result;
  }

  append(str) {
    this._flush();

    const {
      line,
      column,
      filename,
      identifierName
    } = this._sourcePosition;

    this._append(str, line, column, identifierName, filename);
  }

  queue(str) {
    if (str === "\n") {
      while (this._queue.length > 0 && SPACES_RE.test(this._queue[0][0])) {
        this._queue.shift();
      }
    }

    const {
      line,
      column,
      filename,
      identifierName
    } = this._sourcePosition;

    this._queue.unshift([str, line, column, identifierName, filename]);
  }

  _flush() {
    let item;

    while (item = this._queue.pop()) this._append(...item);
  }

  _append(str, line, column, identifierName, filename) {
    if (this._map && str[0] !== "\n") {
      this._map.mark(this._position.line, this._position.column, line, column, identifierName, filename);
    }

    this._buf.push(str);

    this._last = str[str.length - 1];

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this._position.line++;
        this._position.column = 0;
      } else {
        this._position.column++;
      }
    }
  }

  removeTrailingNewline() {
    if (this._queue.length > 0 && this._queue[0][0] === "\n") {
      this._queue.shift();
    }
  }

  removeLastSemicolon() {
    if (this._queue.length > 0 && this._queue[0][0] === ";") {
      this._queue.shift();
    }
  }

  endsWith(suffix) {
    if (suffix.length === 1) {
      let last;

      if (this._queue.length > 0) {
        const str = this._queue[0][0];
        last = str[str.length - 1];
      } else {
        last = this._last;
      }

      return last === suffix;
    }

    const end = this._last + this._queue.reduce((acc, item) => item[0] + acc, "");

    if (suffix.length <= end.length) {
      return end.slice(-suffix.length) === suffix;
    }

    return false;
  }

  hasContent() {
    return this._queue.length > 0 || !!this._last;
  }

  source(prop, loc) {
    if (prop && !loc) return;
    const pos = loc ? loc[prop] : null;
    this._sourcePosition.identifierName = loc && loc.identifierName || null;
    this._sourcePosition.line = pos ? pos.line : null;
    this._sourcePosition.column = pos ? pos.column : null;
    this._sourcePosition.filename = loc && loc.filename || null;
  }

  withSource(prop, loc, cb) {
    if (!this._map) return cb();
    const originalLine = this._sourcePosition.line;
    const originalColumn = this._sourcePosition.column;
    const originalFilename = this._sourcePosition.filename;
    const originalIdentifierName = this._sourcePosition.identifierName;
    this.source(prop, loc);
    cb();
    this._sourcePosition.line = originalLine;
    this._sourcePosition.column = originalColumn;
    this._sourcePosition.filename = originalFilename;
    this._sourcePosition.identifierName = originalIdentifierName;
  }

  getCurrentColumn() {
    const extra = this._queue.reduce((acc, item) => item[0] + acc, "");

    const lastIndex = extra.lastIndexOf("\n");
    return lastIndex === -1 ? this._position.column + extra.length : extra.length - 1 - lastIndex;
  }

  getCurrentLine() {
    const extra = this._queue.reduce((acc, item) => item[0] + acc, "");

    let count = 0;

    for (let i = 0; i < extra.length; i++) {
      if (extra[i] === "\n") count++;
    }

    return this._position.line + count;
  }

}

exports.default = Buffer;