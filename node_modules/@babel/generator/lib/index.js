"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.CodeGenerator = void 0;

var _sourceMap = _interopRequireDefault(require("./source-map"));

var _printer = _interopRequireDefault(require("./printer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Generator = function (_Printer) {
  _inheritsLoose(Generator, _Printer);

  function Generator(ast, opts, code) {
    var _this;

    if (opts === void 0) {
      opts = {};
    }

    var format = normalizeOptions(code, opts);
    var map = opts.sourceMaps ? new _sourceMap.default(opts, code) : null;
    _this = _Printer.call(this, format, map) || this;
    _this.ast = ast;
    return _this;
  }

  var _proto = Generator.prototype;

  _proto.generate = function generate() {
    return _Printer.prototype.generate.call(this, this.ast);
  };

  return Generator;
}(_printer.default);

function normalizeOptions(code, opts) {
  var format = {
    auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
    auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
    shouldPrintComment: opts.shouldPrintComment,
    retainLines: opts.retainLines,
    retainFunctionParens: opts.retainFunctionParens,
    comments: opts.comments == null || opts.comments,
    compact: opts.compact,
    minified: opts.minified,
    concise: opts.concise,
    jsonCompatibleStrings: opts.jsonCompatibleStrings,
    indent: {
      adjustMultilineComment: true,
      style: "  ",
      base: 0
    }
  };

  if (format.minified) {
    format.compact = true;

    format.shouldPrintComment = format.shouldPrintComment || function () {
      return format.comments;
    };
  } else {
    format.shouldPrintComment = format.shouldPrintComment || function (value) {
      return format.comments || value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0;
    };
  }

  if (format.compact === "auto") {
    format.compact = code.length > 500000;

    if (format.compact) {
      console.error("[BABEL] Note: The code generator has deoptimised the styling of " + (opts.filename + " as it exceeds the max of " + "500KB" + "."));
    }
  }

  if (format.compact) {
    format.indent.adjustMultilineComment = false;
  }

  return format;
}

var CodeGenerator = function () {
  function CodeGenerator(ast, opts, code) {
    this._generator = new Generator(ast, opts, code);
  }

  var _proto2 = CodeGenerator.prototype;

  _proto2.generate = function generate() {
    return this._generator.generate();
  };

  return CodeGenerator;
}();

exports.CodeGenerator = CodeGenerator;

function _default(ast, opts, code) {
  var gen = new Generator(ast, opts, code);
  return gen.generate();
}