'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _Debug = require('enzyme/build/Debug');

var _RSTTraversal = require('enzyme/build/RSTTraversal');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildren(node, options) {
  if (options.mode === 'shallow' && typeof node.type === 'function') {
    return null;
  }

  var children = (0, _utils.compact)((0, _RSTTraversal.childrenOfNode)(node).map(function (n) {
    return internalNodeToJson(n, options);
  }));

  return children.length > 0 ? children : null;
}

function getProps(node, options) {
  var props = (0, _omitBy2.default)(_extends({}, (0, _RSTTraversal.propsOfNode)(node)), function (val, key) {
    return key === 'children' || val === undefined;
  });

  if (!(0, _isNil2.default)(node.key) && options.noKey !== true) {
    props.key = node.key;
  }

  return props;
}

function internalNodeToJson(node, options) {
  if (typeof node === 'string' || typeof node === 'number') {
    return node;
  }

  if ((0, _isNil2.default)(node) || node === false) {
    return '';
  }

  if (Array.isArray(node)) {
    return node.map(function (child) {
      return internalNodeToJson(child, options);
    });
  }

  if (options.mode === 'deep' && typeof node.type === 'function') {
    return internalNodeToJson(node.rendered, options);
  }

  return (0, _utils.applyMap)({
    node,
    type: (0, _Debug.typeName)(node),
    props: getProps(node, options),
    children: getChildren(node, options),
    $$typeof: Symbol.for('react.test.json')
  }, options);
}

var mountToJson = function mountToJson(wrapper) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((0, _isNil2.default)(wrapper) || wrapper.length === 0) {
    return null;
  }

  if (wrapper.length > 1 && typeof wrapper.getNodesInternal === 'function') {
    var nodes = wrapper.getNodesInternal();
    return nodes.map(function (node) {
      return internalNodeToJson(node, options);
    });
  }

  if (typeof wrapper.getNodeInternal === 'function') {
    var node = wrapper.getNodeInternal();
    return internalNodeToJson(node, options);
  }

  return null;
};

exports.default = mountToJson;