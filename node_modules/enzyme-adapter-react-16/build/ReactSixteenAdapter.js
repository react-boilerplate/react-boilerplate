var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

var _testUtils = require('react-dom/test-utils');

var _testUtils2 = _interopRequireDefault(_testUtils);

var _enzyme = require('enzyme');

var _enzymeAdapterUtils = require('enzyme-adapter-utils');

var _reflection = require('react-reconciler/reflection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-use-before-define: 0 */

// eslint-disable-next-line import/no-unresolved, import/extensions

// eslint-disable-next-line import/no-unresolved, import/extensions

// eslint-disable-next-line import/no-unresolved, import/extensions


var HostRoot = 3;
var ClassComponent = 2;
var Fragment = 10;
var FunctionalComponent = 1;
var HostPortal = 4;
var HostComponent = 5;
var HostText = 6;

function nodeAndSiblingsArray(nodeWithSibling) {
  var array = [];
  var node = nodeWithSibling;
  while (node != null) {
    array.push(node);
    node = node.sibling;
  }
  return array;
}

function flatten(arr) {
  var result = [];
  var stack = [{ i: 0, array: arr }];
  while (stack.length) {
    var n = stack.pop();
    while (n.i < n.array.length) {
      var el = n.array[n.i];
      n.i += 1;
      if (Array.isArray(el)) {
        stack.push(n);
        stack.push({ i: 0, array: el });
        break;
      }
      result.push(el);
    }
  }
  return result;
}

function toTree(vnode) {
  if (vnode == null) {
    return null;
  }
  // TODO(lmr): I'm not really sure I understand whether or not this is what
  // i should be doing, or if this is a hack for something i'm doing wrong
  // somewhere else. Should talk to sebastian about this perhaps
  var node = (0, _reflection.findCurrentFiberUsingSlowPath)(vnode);
  switch (node.tag) {
    case HostRoot:
      // 3
      return toTree(node.child);
    case HostPortal:
      // 4
      return toTree(node.child);
    case ClassComponent:
      return {
        nodeType: 'class',
        type: node.type,
        props: (0, _object2['default'])({}, node.memoizedProps),
        key: node.key || undefined,
        ref: node.ref,
        instance: node.stateNode,
        rendered: childrenToTree(node.child)
      };
    case Fragment:
      // 10
      return childrenToTree(node.child);
    case FunctionalComponent:
      // 1
      return {
        nodeType: 'function',
        type: node.type,
        props: (0, _object2['default'])({}, node.memoizedProps),
        key: node.key || undefined,
        ref: node.ref,
        instance: null,
        rendered: childrenToTree(node.child)
      };
    case HostComponent:
      {
        // 5
        var renderedNodes = flatten(nodeAndSiblingsArray(node.child).map(toTree));
        if (renderedNodes.length === 0) {
          renderedNodes = [node.memoizedProps.children];
        }
        return {
          nodeType: 'host',
          type: node.type,
          props: (0, _object2['default'])({}, node.memoizedProps),
          key: node.key || undefined,
          ref: node.ref,
          instance: node.stateNode,
          rendered: renderedNodes
        };
      }
    case HostText:
      // 6
      return node.memoizedProps;
    default:
      throw new Error('Enzyme Internal Error: unknown node with tag ' + String(node.tag));
  }
}

function childrenToTree(node) {
  if (!node) {
    return null;
  }
  var children = nodeAndSiblingsArray(node);
  if (children.length === 0) {
    return null;
  } else if (children.length === 1) {
    return toTree(children[0]);
  }
  return flatten(children.map(toTree));
}

function _nodeToHostNode(_node) {
  // NOTE(lmr): node could be a function component
  // which wont have an instance prop, but we can get the
  // host node associated with its return value at that point.
  // Although this breaks down if the return value is an array,
  // as is possible with React 16.
  var node = _node;
  while (node && !Array.isArray(node) && node.instance === null) {
    node = node.rendered;
  }
  if (Array.isArray(node)) {
    // TODO(lmr): throw warning regarding not being able to get a host node here
    throw new Error('Trying to get host node of an array');
  }
  // if the SFC returned null effectively, there is no host node.
  if (!node) {
    return null;
  }
  return _reactDom2['default'].findDOMNode(node.instance);
}

var ReactSixteenAdapter = function (_EnzymeAdapter) {
  _inherits(ReactSixteenAdapter, _EnzymeAdapter);

  function ReactSixteenAdapter() {
    _classCallCheck(this, ReactSixteenAdapter);

    var _this = _possibleConstructorReturn(this, (ReactSixteenAdapter.__proto__ || Object.getPrototypeOf(ReactSixteenAdapter)).call(this));

    _this.options = (0, _object2['default'])({}, _this.options, {
      enableComponentDidUpdateOnSetState: true
    });
    return _this;
  }

  _createClass(ReactSixteenAdapter, [{
    key: 'createMountRenderer',
    value: function () {
      function createMountRenderer(options) {
        (0, _enzymeAdapterUtils.assertDomAvailable)('mount');
        var domNode = options.attachTo || global.document.createElement('div');
        var instance = null;
        return {
          render: function () {
            function render(el, context, callback) {
              if (instance === null) {
                var ReactWrapperComponent = (0, _enzymeAdapterUtils.createMountWrapper)(el, options);
                var wrappedEl = _react2['default'].createElement(ReactWrapperComponent, {
                  Component: el.type,
                  props: el.props,
                  context: context
                });
                instance = _reactDom2['default'].render(wrappedEl, domNode);
                if (typeof callback === 'function') {
                  callback();
                }
              } else {
                instance.setChildProps(el.props, context, callback);
              }
            }

            return render;
          }(),
          unmount: function () {
            function unmount() {
              _reactDom2['default'].unmountComponentAtNode(domNode);
              instance = null;
            }

            return unmount;
          }(),
          getNode: function () {
            function getNode() {
              return instance ? toTree(instance._reactInternalFiber).rendered : null;
            }

            return getNode;
          }(),
          simulateEvent: function () {
            function simulateEvent(node, event, mock) {
              var mappedEvent = (0, _enzymeAdapterUtils.mapNativeEventNames)(event);
              var eventFn = _testUtils2['default'].Simulate[mappedEvent];
              if (!eventFn) {
                throw new TypeError('ReactWrapper::simulate() event \'' + String(event) + '\' does not exist');
              }
              // eslint-disable-next-line react/no-find-dom-node
              eventFn(_nodeToHostNode(node), mock);
            }

            return simulateEvent;
          }(),
          batchedUpdates: function () {
            function batchedUpdates(fn) {
              return fn();
              // return ReactDOM.unstable_batchedUpdates(fn);
            }

            return batchedUpdates;
          }()
        };
      }

      return createMountRenderer;
    }()
  }, {
    key: 'createShallowRenderer',
    value: function () {
      function createShallowRenderer() /* options */{
        var renderer = new _shallow2['default']();
        var isDOM = false;
        var cachedNode = null;
        return {
          render: function () {
            function render(el, context) {
              cachedNode = el;
              /* eslint consistent-return: 0 */
              if (typeof el.type === 'string') {
                isDOM = true;
              } else {
                isDOM = false;
                return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                  return renderer.render(el, context);
                });
              }
            }

            return render;
          }(),
          unmount: function () {
            function unmount() {
              renderer.unmount();
            }

            return unmount;
          }(),
          getNode: function () {
            function getNode() {
              if (isDOM) {
                return (0, _enzymeAdapterUtils.elementToTree)(cachedNode);
              }
              var output = renderer.getRenderOutput();
              return {
                nodeType: (0, _enzymeAdapterUtils.nodeTypeFromType)(cachedNode.type),
                type: cachedNode.type,
                props: cachedNode.props,
                key: cachedNode.key || undefined,
                ref: cachedNode.ref,
                instance: renderer._instance,
                rendered: (0, _enzymeAdapterUtils.elementToTree)(output)
              };
            }

            return getNode;
          }(),
          simulateEvent: function () {
            function simulateEvent(node, event) {
              for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
              }

              var handler = node.props[(0, _enzymeAdapterUtils.propFromEvent)(event)];
              if (handler) {
                (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                  // TODO(lmr): create/use synthetic events
                  // TODO(lmr): emulate React's event propagation
                  // ReactDOM.unstable_batchedUpdates(() => {
                  handler.apply(undefined, _toConsumableArray(args));
                  // });
                });
              }
            }

            return simulateEvent;
          }(),
          batchedUpdates: function () {
            function batchedUpdates(fn) {
              return fn();
              // return ReactDOM.unstable_batchedUpdates(fn);
            }

            return batchedUpdates;
          }()
        };
      }

      return createShallowRenderer;
    }()
  }, {
    key: 'createStringRenderer',
    value: function () {
      function createStringRenderer(options) {
        return {
          render: function () {
            function render(el, context) {
              if (options.context && (el.type.contextTypes || options.childContextTypes)) {
                var childContextTypes = (0, _object2['default'])({}, el.type.contextTypes || {}, options.childContextTypes);
                var ContextWrapper = (0, _enzymeAdapterUtils.createRenderWrapper)(el, context, childContextTypes);
                return _server2['default'].renderToStaticMarkup(_react2['default'].createElement(ContextWrapper));
              }
              return _server2['default'].renderToStaticMarkup(el);
            }

            return render;
          }()
        };
      }

      return createStringRenderer;
    }()

    // Provided a bag of options, return an `EnzymeRenderer`. Some options can be implementation
    // specific, like `attach` etc. for React, but not part of this interface explicitly.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: 'createRenderer',
    value: function () {
      function createRenderer(options) {
        switch (options.mode) {
          case _enzyme.EnzymeAdapter.MODES.MOUNT:
            return this.createMountRenderer(options);
          case _enzyme.EnzymeAdapter.MODES.SHALLOW:
            return this.createShallowRenderer(options);
          case _enzyme.EnzymeAdapter.MODES.STRING:
            return this.createStringRenderer(options);
          default:
            throw new Error('Enzyme Internal Error: Unrecognized mode: ' + String(options.mode));
        }
      }

      return createRenderer;
    }()

    // converts an RSTNode to the corresponding JSX Pragma Element. This will be needed
    // in order to implement the `Wrapper.mount()` and `Wrapper.shallow()` methods, but should
    // be pretty straightforward for people to implement.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: 'nodeToElement',
    value: function () {
      function nodeToElement(node) {
        if (!node || (typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') return null;
        return _react2['default'].createElement(node.type, (0, _enzymeAdapterUtils.propsWithKeysAndRef)(node));
      }

      return nodeToElement;
    }()
  }, {
    key: 'elementToNode',
    value: function () {
      function elementToNode(element) {
        return (0, _enzymeAdapterUtils.elementToTree)(element);
      }

      return elementToNode;
    }()
  }, {
    key: 'nodeToHostNode',
    value: function () {
      function nodeToHostNode(node) {
        return _nodeToHostNode(node);
      }

      return nodeToHostNode;
    }()
  }, {
    key: 'isValidElement',
    value: function () {
      function isValidElement(element) {
        return _react2['default'].isValidElement(element);
      }

      return isValidElement;
    }()
  }, {
    key: 'createElement',
    value: function () {
      function createElement() {
        return _react2['default'].createElement.apply(_react2['default'], arguments);
      }

      return createElement;
    }()
  }]);

  return ReactSixteenAdapter;
}(_enzyme.EnzymeAdapter);

module.exports = ReactSixteenAdapter;