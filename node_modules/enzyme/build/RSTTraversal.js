Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeHasProperty = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.propsOfNode = propsOfNode;
exports.childrenOfNode = childrenOfNode;
exports.hasClassName = hasClassName;
exports.treeForEach = treeForEach;
exports.treeFilter = treeFilter;
exports.findParentNode = findParentNode;
exports.pathToNode = pathToNode;
exports.parentsOfNode = parentsOfNode;
exports.nodeHasId = nodeHasId;
exports.nodeMatchesObjectProps = nodeMatchesObjectProps;
exports.getTextFromNode = getTextFromNode;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _object3 = require('object.entries');

var _object4 = _interopRequireDefault(_object3);

var _isSubset = require('is-subset');

var _isSubset2 = _interopRequireDefault(_isSubset);

var _functionPrototype = require('function.prototype.name');

var _functionPrototype2 = _interopRequireDefault(_functionPrototype);

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function propsOfNode(node) {
  return node && node.props || {};
}

function childrenOfNode(node) {
  if (!node) return [];
  return Array.isArray(node.rendered) ? (0, _flatten2['default'])(node.rendered, true) : [node.rendered];
}

function hasClassName(node, className) {
  var classes = propsOfNode(node).className || '';
  classes = String(classes).replace(/\s/g, ' ');
  return (' ' + String(classes) + ' ').indexOf(' ' + String(className) + ' ') > -1;
}

function treeForEach(tree, fn) {
  if (tree !== null && tree !== false && typeof tree !== 'undefined') {
    fn(tree);
  }
  childrenOfNode(tree).forEach(function (node) {
    return treeForEach(node, fn);
  });
}

function treeFilter(tree, fn) {
  var results = [];
  treeForEach(tree, function (node) {
    if (fn(node)) {
      results.push(node);
    }
  });
  return results;
}

/**
 * To support sibling selectors we need to be able to find
 * the siblings of a node. The easiest way to do that is find
 * the parent of the node and access its children.
 *
 * This would be unneeded if the RST spec included sibling pointers
 * such as node.nextSibling and node.prevSibling
 * @param {*} root
 * @param {*} targetNode
 */
function findParentNode(root, targetNode) {
  var results = treeFilter(root, function (node) {
    if (!node.rendered) {
      return false;
    }
    return Array.isArray(node.rendered) ? node.rendered.indexOf(targetNode) !== -1 : node.rendered === targetNode;
  });
  return results[0] || null;
}

function pathFilter(path, fn) {
  return path.filter(function (tree) {
    return treeFilter(tree, fn).length !== 0;
  });
}

function pathToNode(node, root) {
  var queue = [root];
  var path = [];

  var hasNode = function hasNode(testNode) {
    return node === testNode;
  };

  while (queue.length) {
    var current = queue.pop();
    var children = childrenOfNode(current);
    if (current === node) return pathFilter(path, hasNode);

    path.push(current);

    if (children.length === 0) {
      // leaf node. if it isn't the node we are looking for, we pop.
      path.pop();
    }
    queue.push.apply(queue, _toConsumableArray(children));
  }

  return null;
}

function parentsOfNode(node, root) {
  return pathToNode(node, root).reverse();
}

function nodeHasId(node, id) {
  return propsOfNode(node).id === id;
}

exports.nodeHasProperty = _Utils.nodeHasProperty;


var CAN_NEVER_MATCH = {};
function replaceUndefined(v) {
  return typeof v !== 'undefined' ? v : CAN_NEVER_MATCH;
}
function replaceUndefinedValues(obj) {
  return (0, _object4['default'])(obj).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return (0, _object2['default'])({}, acc, _defineProperty({}, k, replaceUndefined(v)));
  }, {});
}

function nodeMatchesObjectProps(node, props) {
  return (0, _isSubset2['default'])(propsOfNode(node), replaceUndefinedValues(props));
}

function getTextFromNode(node) {
  if (node == null) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (node.type && typeof node.type === 'function') {
    return '<' + String(node.type.displayName || (0, _functionPrototype2['default'])(node.type)) + ' />';
  }

  return childrenOfNode(node).map(getTextFromNode).join('');
}