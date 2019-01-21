'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _RSTTraversal = require('enzyme/build/RSTTraversal');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChildren(node, options) {
  var children = (0, _utils.compact)((0, _RSTTraversal.childrenOfNode)(node).map(function (n) {
    return internalNodeToJson(n, options);
  }));

  if (children.length > 0) {
    return children;
  }

  return null;
}

function getProps(node, options) {
  var props = (0, _omitBy2.default)(Object.assign({}, (0, _RSTTraversal.propsOfNode)(node)), function (val, key) {
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
    return node.map(function (n) {
      return internalNodeToJson(n, options);
    });
  }

  var json = (0, _utils.applyMap)({
    node,
    type: (0, _utils.extractTypeName)(node),
    props: getProps(node, options),
    children: getChildren(node, options),
    $$typeof: Symbol.for('react.test.json')
  }, options);

  if (!(0, _isNil2.default)(json) && !(0, _isNil2.default)(json.type)) {
    return json;
  }
}

var shallowToJson = function shallowToJson(wrapper) {
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

exports.default = shallowToJson;