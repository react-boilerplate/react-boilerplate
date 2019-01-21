'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.typeName = typeName;
exports.spaces = spaces;
exports.indent = indent;
exports.debugNode = debugNode;
exports.debugNodes = debugNodes;

var _lodash = require('lodash.escape');

var _lodash2 = _interopRequireDefault(_lodash);

var _functionPrototype = require('function.prototype.name');

var _functionPrototype2 = _interopRequireDefault(_functionPrototype);

var _isString = require('is-string');

var _isString2 = _interopRequireDefault(_isString);

var _isNumberObject = require('is-number-object');

var _isNumberObject2 = _interopRequireDefault(_isNumberObject);

var _isCallable = require('is-callable');

var _isCallable2 = _interopRequireDefault(_isCallable);

var _isBooleanObject = require('is-boolean-object');

var _isBooleanObject2 = _interopRequireDefault(_isBooleanObject);

var _objectInspect = require('object-inspect');

var _objectInspect2 = _interopRequireDefault(_objectInspect);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _RSTTraversal = require('./RSTTraversal');

var _getAdapter = require('./getAdapter');

var _getAdapter2 = _interopRequireDefault(_getAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var booleanValue = Function.bind.call(Function.call, Boolean.prototype.valueOf);

function typeName(node) {
  var adapter = (0, _getAdapter2['default'])();
  if (adapter.displayNameOfNode) {
    return (0, _getAdapter2['default'])().displayNameOfNode(node) || 'Component';
  }
  return typeof node.type === 'function' ? node.type.displayName || (0, _functionPrototype2['default'])(node.type) || 'Component' : node.type;
}

function spaces(n) {
  return Array(n + 1).join(' ');
}

function indent(depth, string) {
  return string.split('\n').map(function (x) {
    return '' + String(spaces(depth)) + String(x);
  }).join('\n');
}

function propString(prop, options) {
  if ((0, _isString2['default'])(prop)) {
    return (0, _objectInspect2['default'])(String(prop), { quoteStyle: 'double' });
  }
  if ((0, _isNumberObject2['default'])(prop)) {
    return '{' + String((0, _objectInspect2['default'])(Number(prop))) + '}';
  }
  if ((0, _isBooleanObject2['default'])(prop)) {
    return '{' + String((0, _objectInspect2['default'])(booleanValue(prop))) + '}';
  }
  if ((0, _isCallable2['default'])(prop)) {
    return '{' + String((0, _objectInspect2['default'])(prop)) + '}';
  }
  if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
    if (options.verbose) {
      return '{' + String((0, _objectInspect2['default'])(prop)) + '}';
    }

    return '{{...}}';
  }
  return '{[' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + ']}';
}

function propsString(node, options) {
  var props = (0, _RSTTraversal.propsOfNode)(node);
  var keys = Object.keys(props).filter(function (x) {
    return x !== 'children';
  });
  return keys.map(function (key) {
    return String(key) + '=' + String(propString(props[key], options));
  }).join(' ');
}

function indentChildren(childrenStrs, indentLength) {
  return childrenStrs.length ? '\n' + String(childrenStrs.map(function (x) {
    return indent(indentLength, x);
  }).join('\n')) + '\n' : '';
}

function isRSTNodeLike(node) {
  return (0, _has2['default'])(node, 'nodeType') && typeof node.nodeType === 'string' && (0, _has2['default'])(node, 'type') && (0, _has2['default'])(node, 'key') && (0, _has2['default'])(node, 'ref') && (0, _has2['default'])(node, 'instance') && (0, _has2['default'])(node, 'rendered');
}

function debugNode(node) {
  var indentLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof node === 'string' || typeof node === 'number') return (0, _lodash2['default'])(node);
  if (typeof node === 'function') {
    var name = (0, _functionPrototype2['default'])(node);
    return '[function' + (name ? ' ' + String(name) : '') + ']';
  }
  if (!node) return '';

  var adapter = (0, _getAdapter2['default'])();
  if (!adapter.isValidElement(node) && !isRSTNodeLike(node)) {
    return '{' + String((0, _objectInspect2['default'])(node)) + '}';
  }

  var childrenStrs = (0, _RSTTraversal.childrenOfNode)(node).map(function (n) {
    return debugNode(n, indentLength, options);
  }).filter(Boolean);
  var type = typeName(node);

  var props = options.ignoreProps ? '' : propsString(node, options);
  var beforeProps = props ? ' ' : '';
  var afterProps = childrenStrs.length ? '>' : ' ';
  var childrenIndented = indentChildren(childrenStrs, indentLength);
  var nodeClose = childrenStrs.length ? '</' + String(type) + '>' : '/>';
  return '<' + String(type) + beforeProps + String(props) + afterProps + String(childrenIndented) + nodeClose;
}

function debugNodes(nodes) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return nodes.map(function (node) {
    return debugNode(node, undefined, options);
  }).join('\n\n\n');
}