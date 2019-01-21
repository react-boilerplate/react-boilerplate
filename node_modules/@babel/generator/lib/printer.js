"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _isInteger() {
  var data = _interopRequireDefault(require("lodash/isInteger"));

  _isInteger = function _isInteger() {
    return data;
  };

  return data;
}

function _repeat() {
  var data = _interopRequireDefault(require("lodash/repeat"));

  _repeat = function _repeat() {
    return data;
  };

  return data;
}

var _buffer = _interopRequireDefault(require("./buffer"));

var n = _interopRequireWildcard(require("./node"));

function t() {
  var data = _interopRequireWildcard(require("@babel/types"));

  t = function t() {
    return data;
  };

  return data;
}

var generatorFunctions = _interopRequireWildcard(require("./generators"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCIENTIFIC_NOTATION = /e/i;
var ZERO_DECIMAL_INTEGER = /\.0+$/;
var NON_DECIMAL_LITERAL = /^0[box]/;

var Printer = function () {
  function Printer(format, map) {
    this.inForStatementInitCounter = 0;
    this._printStack = [];
    this._indent = 0;
    this._insideAux = false;
    this._printedCommentStarts = {};
    this._parenPushNewlineState = null;
    this._noLineTerminator = false;
    this._printAuxAfterOnNextUserNode = false;
    this._printedComments = new WeakSet();
    this._endsWithInteger = false;
    this._endsWithWord = false;
    this.format = format || {};
    this._buf = new _buffer.default(map);
  }

  var _proto = Printer.prototype;

  _proto.generate = function generate(ast) {
    this.print(ast);

    this._maybeAddAuxComment();

    return this._buf.get();
  };

  _proto.indent = function indent() {
    if (this.format.compact || this.format.concise) return;
    this._indent++;
  };

  _proto.dedent = function dedent() {
    if (this.format.compact || this.format.concise) return;
    this._indent--;
  };

  _proto.semicolon = function semicolon(force) {
    if (force === void 0) {
      force = false;
    }

    this._maybeAddAuxComment();

    this._append(";", !force);
  };

  _proto.rightBrace = function rightBrace() {
    if (this.format.minified) {
      this._buf.removeLastSemicolon();
    }

    this.token("}");
  };

  _proto.space = function space(force) {
    if (force === void 0) {
      force = false;
    }

    if (this.format.compact) return;

    if (this._buf.hasContent() && !this.endsWith(" ") && !this.endsWith("\n") || force) {
      this._space();
    }
  };

  _proto.word = function word(str) {
    if (this._endsWithWord || this.endsWith("/") && str.indexOf("/") === 0) {
      this._space();
    }

    this._maybeAddAuxComment();

    this._append(str);

    this._endsWithWord = true;
  };

  _proto.number = function number(str) {
    this.word(str);
    this._endsWithInteger = (0, _isInteger().default)(+str) && !NON_DECIMAL_LITERAL.test(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && str[str.length - 1] !== ".";
  };

  _proto.token = function token(str) {
    if (str === "--" && this.endsWith("!") || str[0] === "+" && this.endsWith("+") || str[0] === "-" && this.endsWith("-") || str[0] === "." && this._endsWithInteger) {
      this._space();
    }

    this._maybeAddAuxComment();

    this._append(str);
  };

  _proto.newline = function newline(i) {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    if (this.endsWith("\n\n")) return;
    if (typeof i !== "number") i = 1;
    i = Math.min(2, i);
    if (this.endsWith("{\n") || this.endsWith(":\n")) i--;
    if (i <= 0) return;

    for (var j = 0; j < i; j++) {
      this._newline();
    }
  };

  _proto.endsWith = function endsWith(str) {
    return this._buf.endsWith(str);
  };

  _proto.removeTrailingNewline = function removeTrailingNewline() {
    this._buf.removeTrailingNewline();
  };

  _proto.source = function source(prop, loc) {
    this._catchUp(prop, loc);

    this._buf.source(prop, loc);
  };

  _proto.withSource = function withSource(prop, loc, cb) {
    this._catchUp(prop, loc);

    this._buf.withSource(prop, loc, cb);
  };

  _proto._space = function _space() {
    this._append(" ", true);
  };

  _proto._newline = function _newline() {
    this._append("\n", true);
  };

  _proto._append = function _append(str, queue) {
    if (queue === void 0) {
      queue = false;
    }

    this._maybeAddParen(str);

    this._maybeIndent(str);

    if (queue) this._buf.queue(str);else this._buf.append(str);
    this._endsWithWord = false;
    this._endsWithInteger = false;
  };

  _proto._maybeIndent = function _maybeIndent(str) {
    if (this._indent && this.endsWith("\n") && str[0] !== "\n") {
      this._buf.queue(this._getIndent());
    }
  };

  _proto._maybeAddParen = function _maybeAddParen(str) {
    var parenPushNewlineState = this._parenPushNewlineState;
    if (!parenPushNewlineState) return;
    this._parenPushNewlineState = null;
    var i;

    for (i = 0; i < str.length && str[i] === " "; i++) {
      continue;
    }

    if (i === str.length) return;
    var cha = str[i];

    if (cha !== "\n") {
      if (cha !== "/") return;
      if (i + 1 === str.length) return;
      var chaPost = str[i + 1];
      if (chaPost !== "/" && chaPost !== "*") return;
    }

    this.token("(");
    this.indent();
    parenPushNewlineState.printed = true;
  };

  _proto._catchUp = function _catchUp(prop, loc) {
    if (!this.format.retainLines) return;
    var pos = loc ? loc[prop] : null;

    if (pos && pos.line !== null) {
      var count = pos.line - this._buf.getCurrentLine();

      for (var i = 0; i < count; i++) {
        this._newline();
      }
    }
  };

  _proto._getIndent = function _getIndent() {
    return (0, _repeat().default)(this.format.indent.style, this._indent);
  };

  _proto.startTerminatorless = function startTerminatorless(isLabel) {
    if (isLabel === void 0) {
      isLabel = false;
    }

    if (isLabel) {
      this._noLineTerminator = true;
      return null;
    } else {
      return this._parenPushNewlineState = {
        printed: false
      };
    }
  };

  _proto.endTerminatorless = function endTerminatorless(state) {
    this._noLineTerminator = false;

    if (state && state.printed) {
      this.dedent();
      this.newline();
      this.token(")");
    }
  };

  _proto.print = function print(node, parent) {
    var _this = this;

    if (!node) return;
    var oldConcise = this.format.concise;

    if (node._compact) {
      this.format.concise = true;
    }

    var printMethod = this[node.type];

    if (!printMethod) {
      throw new ReferenceError("unknown node of type " + JSON.stringify(node.type) + " with constructor " + JSON.stringify(node && node.constructor.name));
    }

    this._printStack.push(node);

    var oldInAux = this._insideAux;
    this._insideAux = !node.loc;

    this._maybeAddAuxComment(this._insideAux && !oldInAux);

    var needsParens = n.needsParens(node, parent, this._printStack);

    if (this.format.retainFunctionParens && node.type === "FunctionExpression" && node.extra && node.extra.parenthesized) {
      needsParens = true;
    }

    if (needsParens) this.token("(");

    this._printLeadingComments(node, parent);

    var loc = t().isProgram(node) || t().isFile(node) ? null : node.loc;
    this.withSource("start", loc, function () {
      _this[node.type](node, parent);
    });

    this._printTrailingComments(node, parent);

    if (needsParens) this.token(")");

    this._printStack.pop();

    this.format.concise = oldConcise;
    this._insideAux = oldInAux;
  };

  _proto._maybeAddAuxComment = function _maybeAddAuxComment(enteredPositionlessNode) {
    if (enteredPositionlessNode) this._printAuxBeforeComment();
    if (!this._insideAux) this._printAuxAfterComment();
  };

  _proto._printAuxBeforeComment = function _printAuxBeforeComment() {
    if (this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = true;
    var comment = this.format.auxiliaryCommentBefore;

    if (comment) {
      this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  };

  _proto._printAuxAfterComment = function _printAuxAfterComment() {
    if (!this._printAuxAfterOnNextUserNode) return;
    this._printAuxAfterOnNextUserNode = false;
    var comment = this.format.auxiliaryCommentAfter;

    if (comment) {
      this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  };

  _proto.getPossibleRaw = function getPossibleRaw(node) {
    var extra = node.extra;

    if (extra && extra.raw != null && extra.rawValue != null && node.value === extra.rawValue) {
      return extra.raw;
    }
  };

  _proto.printJoin = function printJoin(nodes, parent, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!nodes || !nodes.length) return;
    if (opts.indent) this.indent();
    var newlineOpts = {
      addNewlines: opts.addNewlines
    };

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!node) continue;
      if (opts.statement) this._printNewline(true, node, parent, newlineOpts);
      this.print(node, parent);

      if (opts.iterator) {
        opts.iterator(node, i);
      }

      if (opts.separator && i < nodes.length - 1) {
        opts.separator.call(this);
      }

      if (opts.statement) this._printNewline(false, node, parent, newlineOpts);
    }

    if (opts.indent) this.dedent();
  };

  _proto.printAndIndentOnComments = function printAndIndentOnComments(node, parent) {
    var indent = node.leadingComments && node.leadingComments.length > 0;
    if (indent) this.indent();
    this.print(node, parent);
    if (indent) this.dedent();
  };

  _proto.printBlock = function printBlock(parent) {
    var node = parent.body;

    if (!t().isEmptyStatement(node)) {
      this.space();
    }

    this.print(node, parent);
  };

  _proto._printTrailingComments = function _printTrailingComments(node, parent) {
    this._printComments(this._getComments(false, node, parent));
  };

  _proto._printLeadingComments = function _printLeadingComments(node, parent) {
    this._printComments(this._getComments(true, node, parent));
  };

  _proto.printInnerComments = function printInnerComments(node, indent) {
    if (indent === void 0) {
      indent = true;
    }

    if (!node.innerComments || !node.innerComments.length) return;
    if (indent) this.indent();

    this._printComments(node.innerComments);

    if (indent) this.dedent();
  };

  _proto.printSequence = function printSequence(nodes, parent, opts) {
    if (opts === void 0) {
      opts = {};
    }

    opts.statement = true;
    return this.printJoin(nodes, parent, opts);
  };

  _proto.printList = function printList(items, parent, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (opts.separator == null) {
      opts.separator = commaSeparator;
    }

    return this.printJoin(items, parent, opts);
  };

  _proto._printNewline = function _printNewline(leading, node, parent, opts) {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    var lines = 0;

    if (this._buf.hasContent()) {
      if (!leading) lines++;
      if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;
      var needs = leading ? n.needsWhitespaceBefore : n.needsWhitespaceAfter;
      if (needs(node, parent)) lines++;
    }

    this.newline(lines);
  };

  _proto._getComments = function _getComments(leading, node) {
    return node && (leading ? node.leadingComments : node.trailingComments) || [];
  };

  _proto._printComment = function _printComment(comment) {
    var _this2 = this;

    if (!this.format.shouldPrintComment(comment.value)) return;
    if (comment.ignore) return;
    if (this._printedComments.has(comment)) return;

    this._printedComments.add(comment);

    if (comment.start != null) {
      if (this._printedCommentStarts[comment.start]) return;
      this._printedCommentStarts[comment.start] = true;
    }

    var isBlockComment = comment.type === "CommentBlock";
    this.newline(this._buf.hasContent() && !this._noLineTerminator && isBlockComment ? 1 : 0);
    if (!this.endsWith("[") && !this.endsWith("{")) this.space();
    var val = !isBlockComment && !this._noLineTerminator ? "//" + comment.value + "\n" : "/*" + comment.value + "*/";

    if (isBlockComment && this.format.indent.adjustMultilineComment) {
      var offset = comment.loc && comment.loc.start.column;

      if (offset) {
        var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
        val = val.replace(newlineRegex, "\n");
      }

      var indentSize = Math.max(this._getIndent().length, this._buf.getCurrentColumn());
      val = val.replace(/\n(?!$)/g, "\n" + (0, _repeat().default)(" ", indentSize));
    }

    if (this.endsWith("/")) this._space();
    this.withSource("start", comment.loc, function () {
      _this2._append(val);
    });
    this.newline(isBlockComment && !this._noLineTerminator ? 1 : 0);
  };

  _proto._printComments = function _printComments(comments) {
    if (!comments || !comments.length) return;

    for (var _iterator = comments, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _comment = _ref;

      this._printComment(_comment);
    }
  };

  return Printer;
}();

exports.default = Printer;
Object.assign(Printer.prototype, generatorFunctions);

function commaSeparator() {
  this.token(",");
  this.space();
}