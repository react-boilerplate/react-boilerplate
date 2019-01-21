'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ITERATOR_SYMBOL = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getAdapter = getAdapter;
exports.makeOptions = makeOptions;
exports.isCustomComponentElement = isCustomComponentElement;
exports.propsOfNode = propsOfNode;
exports.typeOfNode = typeOfNode;
exports.nodeHasType = nodeHasType;
exports.nodeMatches = nodeMatches;
exports.nodeEqual = nodeEqual;
exports.containsChildrenSubArray = containsChildrenSubArray;
exports.childrenToSimplifiedArray = childrenToSimplifiedArray;
exports.isReactElementAlike = isReactElementAlike;
exports.withSetStateAllowed = withSetStateAllowed;
exports.AND = AND;
exports.displayNameOfNode = displayNameOfNode;
exports.sym = sym;
exports.privateSet = privateSet;
exports.cloneElement = cloneElement;
exports.spyMethod = spyMethod;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _objectIs = require('object-is');

var _objectIs2 = _interopRequireDefault(_objectIs);

var _object3 = require('object.entries');

var _object4 = _interopRequireDefault(_object3);

var _functionPrototype = require('function.prototype.name');

var _functionPrototype2 = _interopRequireDefault(_functionPrototype);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _arrayPrototype = require('array.prototype.flat');

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

var _stringPrototype = require('string.prototype.trim');

var _stringPrototype2 = _interopRequireDefault(_stringPrototype);

var _configuration = require('./configuration');

var _RSTTraversal = require('./RSTTraversal');

var _getAdapter = require('./getAdapter');

var _getAdapter2 = _interopRequireDefault(_getAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint no-use-before-define: 0 */


var ITERATOR_SYMBOL = exports.ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;

function getAdapter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  console.warn('getAdapter from Utils is deprecated; please use ./getAdapter instead');
  return (0, _getAdapter2['default'])(options);
}

function validateMountOptions(attachTo, hydrateIn) {
  if (attachTo && hydrateIn && attachTo !== hydrateIn) {
    throw new TypeError('If both the `attachTo` and `hydrateIn` options are provided, they must be === (for backwards compatibility)');
  }
}

function makeOptions(options) {
  var _get = (0, _configuration.get)(),
      configAttachTo = _get.attachTo,
      configHydrateIn = _get.hydrateIn,
      config = _objectWithoutProperties(_get, ['attachTo', 'hydrateIn']);

  validateMountOptions(configAttachTo, configHydrateIn);

  var attachTo = options.attachTo,
      hydrateIn = options.hydrateIn;

  validateMountOptions(attachTo, hydrateIn);

  // neither present: both undefined
  // only attachTo present: attachTo set, hydrateIn undefined
  // only hydrateIn present: both set to hydrateIn
  // both present (and ===, per above): both set to hydrateIn
  var finalAttachTo = hydrateIn || configHydrateIn || configAttachTo || attachTo || undefined;
  var finalHydrateIn = hydrateIn || configHydrateIn || undefined;
  var mountTargets = (0, _object2['default'])({}, finalAttachTo && { attachTo: finalAttachTo }, finalHydrateIn && { hydrateIn: finalHydrateIn });

  return (0, _object2['default'])({}, config, options, mountTargets);
}

function isCustomComponentElement(inst, adapter) {
  if (adapter.isCustomComponentElement) {
    return !!adapter.isCustomComponentElement(inst);
  }
  return !!inst && adapter.isValidElement(inst) && typeof inst.type === 'function';
}

function propsOfNode(node) {
  return (0, _object4['default'])(node && node.props || {}).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        value = _ref2[1];

    return typeof value !== 'undefined';
  }).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return (0, _object2['default'])(acc, _defineProperty({}, key, value));
  }, {});
}

function typeOfNode(node) {
  return node ? node.type : null;
}

function nodeHasType(node, type) {
  if (!type || !node) return false;

  var adapter = (0, _getAdapter2['default'])();
  if (adapter.displayNameOfNode) {
    var displayName = adapter.displayNameOfNode(node);
    return displayName === type;
  }

  if (!node.type) return false;
  if (typeof node.type === 'string') return node.type === type;
  return (typeof node.type === 'function' ? (0, _functionPrototype2['default'])(node.type) === type : node.type.name === type) || node.type.displayName === type;
}

function internalChildrenCompare(a, b, lenComp, isLoose) {
  var nodeCompare = isLoose ? nodeMatches : nodeEqual;

  if (a === b) return true;
  if (!Array.isArray(a) && !Array.isArray(b)) {
    return nodeCompare(a, b, lenComp);
  }
  var flatA = (0, _arrayPrototype2['default'])(a, Infinity);
  var flatB = (0, _arrayPrototype2['default'])(b, Infinity);
  if (flatA.length !== flatB.length) return false;
  if (flatA.length === 0 && flatB.length === 0) return true;
  for (var i = 0; i < flatA.length; i += 1) {
    if (!nodeCompare(flatA[i], flatB[i], lenComp)) return false;
  }
  return true;
}

function childrenMatch(a, b, lenComp) {
  return internalChildrenCompare(a, b, lenComp, true);
}

function childrenEqual(a, b, lenComp) {
  return internalChildrenCompare(a, b, lenComp, false);
}

function removeNullaryReducer(acc, _ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      key = _ref6[0],
      value = _ref6[1];

  var addition = value == null ? {} : _defineProperty({}, key, value);
  return (0, _object2['default'])({}, acc, addition);
}

function internalNodeCompare(a, b, lenComp, isLoose) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.type !== b.type) return false;

  var left = propsOfNode(a);
  var right = propsOfNode(b);
  if (isLoose) {
    left = (0, _object4['default'])(left).reduce(removeNullaryReducer, {});
    right = (0, _object4['default'])(right).reduce(removeNullaryReducer, {});
  }

  var leftKeys = Object.keys(left);
  for (var i = 0; i < leftKeys.length; i += 1) {
    var prop = leftKeys[i];
    // we will check children later
    if (prop === 'children') {
      // continue;
    } else if (!(prop in right)) {
      return false;
    } else if (right[prop] === left[prop]) {
      // continue;
    } else if (_typeof(right[prop]) === _typeof(left[prop]) && _typeof(left[prop]) === 'object') {
      if (!(0, _lodash2['default'])(left[prop], right[prop])) return false;
    } else {
      return false;
    }
  }

  var leftHasChildren = 'children' in left;
  var rightHasChildren = 'children' in right;
  var childCompare = isLoose ? childrenMatch : childrenEqual;
  if (leftHasChildren || rightHasChildren) {
    if (!childCompare(childrenToSimplifiedArray(left.children, isLoose), childrenToSimplifiedArray(right.children, isLoose), lenComp)) {
      return false;
    }
  }

  if (!isTextualNode(a)) {
    var rightKeys = Object.keys(right);
    return lenComp(leftKeys.length - leftHasChildren, rightKeys.length - rightHasChildren);
  }

  return false;
}

function nodeMatches(a, b) {
  var lenComp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _objectIs2['default'];

  return internalNodeCompare(a, b, lenComp, true);
}

function nodeEqual(a, b) {
  var lenComp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _objectIs2['default'];

  return internalNodeCompare(a, b, lenComp, false);
}

function containsChildrenSubArray(match, node, subArray) {
  var children = (0, _RSTTraversal.childrenOfNode)(node);
  var checker = function checker(_, i) {
    return arraysEqual(match, children.slice(i, i + subArray.length), subArray);
  };
  return children.some(checker);
}

function arraysEqual(match, left, right) {
  return left.length === right.length && left.every(function (el, i) {
    return match(el, right[i]);
  });
}

function childrenToArray(children) {
  var result = [];

  var push = function push(el) {
    if (el === null || el === false || typeof el === 'undefined') return;
    result.push(el);
  };

  if (Array.isArray(children)) {
    children.forEach(push);
  } else {
    push(children);
  }
  return result;
}

function childrenToSimplifiedArray(nodeChildren) {
  var isLoose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var childrenArray = childrenToArray(nodeChildren);
  var simplifiedArray = [];

  for (var i = 0; i < childrenArray.length; i += 1) {
    var child = childrenArray[i];
    var previousChild = simplifiedArray.pop();

    if (typeof previousChild === 'undefined') {
      simplifiedArray.push(child);
    } else if (isTextualNode(child) && isTextualNode(previousChild)) {
      simplifiedArray.push(previousChild + child);
    } else {
      simplifiedArray.push(previousChild);
      simplifiedArray.push(child);
    }
  }

  if (isLoose) {
    return simplifiedArray.map(function (x) {
      return typeof x === 'string' ? (0, _stringPrototype2['default'])(x) : x;
    });
  }

  return simplifiedArray;
}

function isTextualNode(node) {
  return typeof node === 'string' || typeof node === 'number';
}

function isReactElementAlike(arg, adapter) {
  return adapter.isValidElement(arg) || isTextualNode(arg) || Array.isArray(arg);
}

// TODO(lmr): can we get rid of this outside of the adapter?
function withSetStateAllowed(fn) {
  // NOTE(lmr):
  // this is currently here to circumvent a React bug where `setState()` is
  // not allowed without global being defined.
  var cleanup = false;
  if (typeof global.document === 'undefined') {
    cleanup = true;
    global.document = {};
  }
  fn();
  if (cleanup) {
    // This works around a bug in node/jest in that developers aren't able to
    // delete things from global when running in a node vm.
    global.document = undefined;
    delete global.document;
  }
}

function AND(fns) {
  var fnsReversed = fns.slice().reverse();
  return function (x) {
    return fnsReversed.every(function (fn) {
      return fn(x);
    });
  };
}

function displayNameOfNode(node) {
  if (!node) return null;

  var type = node.type;


  if (!type) return null;

  return type.displayName || (typeof type === 'function' ? (0, _functionPrototype2['default'])(type) : type.name || type);
}

function sym(s) {
  return typeof Symbol === 'function' ? Symbol['for']('enzyme.' + String(s)) : s;
}

function privateSet(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value: value,
    enumerable: false,
    writable: true
  });
}

function cloneElement(adapter, el, props) {
  return adapter.createElement(el.type, (0, _object2['default'])({}, el.props, props));
}

function spyMethod(instance, methodName) {
  var lastReturnValue = void 0;
  var originalMethod = instance[methodName];
  var hasOwn = (0, _has2['default'])(instance, methodName);
  var descriptor = void 0;
  if (hasOwn) {
    descriptor = Object.getOwnPropertyDescriptor(instance, methodName);
  }
  Object.defineProperty(instance, methodName, {
    configurable: true,
    enumerable: !descriptor || !!descriptor.enumerable,
    value: function () {
      function value() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = originalMethod.apply(this, args);
        lastReturnValue = result;
        return result;
      }

      return value;
    }()
  });
  return {
    restore: function () {
      function restore() {
        if (hasOwn) {
          if (descriptor) {
            Object.defineProperty(instance, methodName, descriptor);
          } else {
            /* eslint-disable no-param-reassign */
            instance[methodName] = originalMethod;
            /* eslint-enable no-param-reassign */
          }
        } else {
          /* eslint-disable no-param-reassign */
          delete instance[methodName];
          /* eslint-enable no-param-reassign */
        }
      }

      return restore;
    }(),
    getLastReturnValue: function () {
      function getLastReturnValue() {
        return lastReturnValue;
      }

      return getLastReturnValue;
    }()
  };
}