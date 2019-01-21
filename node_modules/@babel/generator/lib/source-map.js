"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _sourceMap() {
  var data = _interopRequireDefault(require("source-map"));

  _sourceMap = function _sourceMap() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceMap = function () {
  function SourceMap(opts, code) {
    this._cachedMap = null;
    this._code = code;
    this._opts = opts;
    this._rawMappings = [];
  }

  var _proto = SourceMap.prototype;

  _proto.get = function get() {
    if (!this._cachedMap) {
      var map = this._cachedMap = new (_sourceMap().default.SourceMapGenerator)({
        sourceRoot: this._opts.sourceRoot
      });
      var code = this._code;

      if (typeof code === "string") {
        map.setSourceContent(this._opts.sourceFileName, code);
      } else if (typeof code === "object") {
        Object.keys(code).forEach(function (sourceFileName) {
          map.setSourceContent(sourceFileName, code[sourceFileName]);
        });
      }

      this._rawMappings.forEach(map.addMapping, map);
    }

    return this._cachedMap.toJSON();
  };

  _proto.getRawMappings = function getRawMappings() {
    return this._rawMappings.slice();
  };

  _proto.mark = function mark(generatedLine, generatedColumn, line, column, identifierName, filename) {
    if (this._lastGenLine !== generatedLine && line === null) return;

    if (this._lastGenLine === generatedLine && this._lastSourceLine === line && this._lastSourceColumn === column) {
      return;
    }

    this._cachedMap = null;
    this._lastGenLine = generatedLine;
    this._lastSourceLine = line;
    this._lastSourceColumn = column;

    this._rawMappings.push({
      name: identifierName || undefined,
      generated: {
        line: generatedLine,
        column: generatedColumn
      },
      source: line == null ? undefined : filename || this._opts.sourceFileName,
      original: line == null ? undefined : {
        line: line,
        column: column
      }
    });
  };

  return SourceMap;
}();

exports.default = SourceMap;