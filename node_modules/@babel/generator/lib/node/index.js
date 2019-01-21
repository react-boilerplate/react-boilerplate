"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.needsWhitespace = needsWhitespace;
exports.needsWhitespaceBefore = needsWhitespaceBefore;
exports.needsWhitespaceAfter = needsWhitespaceAfter;
exports.needsParens = needsParens;

var whitespace = _interopRequireWildcard(require("./whitespace"));

var parens = _interopRequireWildcard(require("./parentheses"));

function t() {
  var data = _interopRequireWildcard(require("@babel/types"));

  t = function t() {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function expandAliases(obj) {
  var newObj = {};

  function add(type, func) {
    var fn = newObj[type];
    newObj[type] = fn ? function (node, parent, stack) {
      var result = fn(node, parent, stack);
      return result == null ? func(node, parent, stack) : result;
    } : func;
  }

  var _arr = Object.keys(obj);

  for (var _i = 0; _i < _arr.length; _i++) {
    var type = _arr[_i];
    var aliases = t().FLIPPED_ALIAS_KEYS[type];

    if (aliases) {
      for (var _iterator = aliases, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i2 >= _iterator.length) break;
          _ref = _iterator[_i2++];
        } else {
          _i2 = _iterator.next();
          if (_i2.done) break;
          _ref = _i2.value;
        }

        var alias = _ref;
        add(alias, obj[type]);
      }
    } else {
      add(type, obj[type]);
    }
  }

  return newObj;
}

var expandedParens = expandAliases(parens);
var expandedWhitespaceNodes = expandAliases(whitespace.nodes);
var expandedWhitespaceList = expandAliases(whitespace.list);

function find(obj, node, parent, printStack) {
  var fn = obj[node.type];
  return fn ? fn(node, parent, printStack) : null;
}

function isOrHasCallExpression(node) {
  if (t().isCallExpression(node)) {
    return true;
  }

  if (t().isMemberExpression(node)) {
    return isOrHasCallExpression(node.object) || !node.computed && isOrHasCallExpression(node.property);
  } else {
    return false;
  }
}

function needsWhitespace(node, parent, type) {
  if (!node) return 0;

  if (t().isExpressionStatement(node)) {
    node = node.expression;
  }

  var linesInfo = find(expandedWhitespaceNodes, node, parent);

  if (!linesInfo) {
    var items = find(expandedWhitespaceList, node, parent);

    if (items) {
      for (var i = 0; i < items.length; i++) {
        linesInfo = needsWhitespace(items[i], node, type);
        if (linesInfo) break;
      }
    }
  }

  if (typeof linesInfo === "object" && linesInfo !== null) {
    return linesInfo[type] || 0;
  }

  return 0;
}

function needsWhitespaceBefore(node, parent) {
  return needsWhitespace(node, parent, "before");
}

function needsWhitespaceAfter(node, parent) {
  return needsWhitespace(node, parent, "after");
}

function needsParens(node, parent, printStack) {
  if (!parent) return false;

  if (t().isNewExpression(parent) && parent.callee === node) {
    if (isOrHasCallExpression(node)) return true;
  }

  return find(expandedParens, node, parent, printStack);
}