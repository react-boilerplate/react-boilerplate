'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _functionPrototype = require('function.prototype.name');

var _functionPrototype2 = _interopRequireDefault(_functionPrototype);

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

var _reactIs = require('react-is');

var _enzyme = require('enzyme');

var _Utils = require('enzyme/build/Utils');

var _enzymeAdapterUtils = require('enzyme-adapter-utils');

var _findCurrentFiberUsingSlowPath = require('./findCurrentFiberUsingSlowPath');

var _findCurrentFiberUsingSlowPath2 = _interopRequireDefault(_findCurrentFiberUsingSlowPath);

var _detectFiberTags = require('./detectFiberTags');

var _detectFiberTags2 = _interopRequireDefault(_detectFiberTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-use-before-define: 0 */

// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved


// Lazily populated if DOM is available.
var FiberTags = null;

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

function nodeTypeFromType(type) {
  if (type === _reactIs.Portal) {
    return 'portal';
  }

  return (0, _enzymeAdapterUtils.nodeTypeFromType)(type);
}

function elementToTree(el) {
  if (!(0, _reactIs.isPortal)(el)) {
    return (0, _enzymeAdapterUtils.elementToTree)(el, elementToTree);
  }

  var children = el.children,
      containerInfo = el.containerInfo;

  var props = { children: children, containerInfo: containerInfo };

  return {
    nodeType: 'portal',
    type: _reactIs.Portal,
    props: props,
    key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(el.key),
    ref: el.ref || null,
    instance: null,
    rendered: elementToTree(el.children)
  };
}

function toTree(vnode) {
  if (vnode == null) {
    return null;
  }
  // TODO(lmr): I'm not really sure I understand whether or not this is what
  // i should be doing, or if this is a hack for something i'm doing wrong
  // somewhere else. Should talk to sebastian about this perhaps
  var node = (0, _findCurrentFiberUsingSlowPath2['default'])(vnode);
  switch (node.tag) {
    case FiberTags.HostRoot:
      return childrenToTree(node.child);
    case FiberTags.HostPortal:
      {
        var containerInfo = node.stateNode.containerInfo,
            children = node.memoizedProps;

        var props = { containerInfo: containerInfo, children: children };
        return {
          nodeType: 'portal',
          type: _reactIs.Portal,
          props: props,
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: null,
          rendered: childrenToTree(node.child)
        };
      }
    case FiberTags.ClassComponent:
      return {
        nodeType: 'class',
        type: node.type,
        props: (0, _object2['default'])({}, node.memoizedProps),
        key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
        ref: node.ref,
        instance: node.stateNode,
        rendered: childrenToTree(node.child)
      };
    case FiberTags.FunctionalComponent:
      return {
        nodeType: 'function',
        type: node.type,
        props: (0, _object2['default'])({}, node.memoizedProps),
        key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
        ref: node.ref,
        instance: null,
        rendered: childrenToTree(node.child)
      };

    case FiberTags.HostComponent:
      {
        var renderedNodes = flatten(nodeAndSiblingsArray(node.child).map(toTree));
        if (renderedNodes.length === 0) {
          renderedNodes = [node.memoizedProps.children];
        }
        return {
          nodeType: 'host',
          type: node.type,
          props: (0, _object2['default'])({}, node.memoizedProps),
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: node.stateNode,
          rendered: renderedNodes
        };
      }
    case FiberTags.HostText:
      return node.memoizedProps;
    case FiberTags.Fragment:
    case FiberTags.Mode:
    case FiberTags.ContextProvider:
    case FiberTags.ContextConsumer:
      return childrenToTree(node.child);
    case FiberTags.ForwardRef:
      {
        return {
          nodeType: 'function',
          type: node.type,
          props: (0, _object2['default'])({}, node.pendingProps),
          key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(node.key),
          ref: node.ref,
          instance: null,
          rendered: childrenToTree(node.child)
        };
      }
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
  }
  if (children.length === 1) {
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

var eventOptions = {
  animation: true,
  pointerEvents: !!_testUtils2['default'].Simulate.touchStart, // 16.4+
  auxClick: !!_testUtils2['default'].Simulate.auxClick // 16.5+
};

function getEmptyStateValue() {
  // this handles a bug in React 16.0 - 16.2
  // see https://github.com/facebook/react/commit/39be83565c65f9c522150e52375167568a2a1459
  // also see https://github.com/facebook/react/pull/11965

  // eslint-disable-next-line react/prefer-stateless-function
  var EmptyState = function (_React$Component) {
    _inherits(EmptyState, _React$Component);

    function EmptyState() {
      _classCallCheck(this, EmptyState);

      return _possibleConstructorReturn(this, (EmptyState.__proto__ || Object.getPrototypeOf(EmptyState)).apply(this, arguments));
    }

    _createClass(EmptyState, [{
      key: 'render',
      value: function () {
        function render() {
          return null;
        }

        return render;
      }()
    }]);

    return EmptyState;
  }(_react2['default'].Component);

  var testRenderer = new _shallow2['default']();
  testRenderer.render(_react2['default'].createElement(EmptyState));
  return testRenderer._instance.state;
}

var ReactSixteenAdapter = function (_EnzymeAdapter) {
  _inherits(ReactSixteenAdapter, _EnzymeAdapter);

  function ReactSixteenAdapter() {
    _classCallCheck(this, ReactSixteenAdapter);

    var _this2 = _possibleConstructorReturn(this, (ReactSixteenAdapter.__proto__ || Object.getPrototypeOf(ReactSixteenAdapter)).call(this));

    var lifecycles = _this2.options.lifecycles;

    _this2.options = (0, _object2['default'])({}, _this2.options, {
      enableComponentDidUpdateOnSetState: true, // TODO: remove, semver-major
      lifecycles: (0, _object2['default'])({}, lifecycles, {
        componentDidUpdate: {
          onSetState: true
        },
        getDerivedStateFromProps: true,
        getSnapshotBeforeUpdate: true,
        setState: {
          skipsComponentDidUpdateOnNullish: true
        }
      })
    });
    return _this2;
  }

  _createClass(ReactSixteenAdapter, [{
    key: 'createMountRenderer',
    value: function () {
      function createMountRenderer(options) {
        (0, _enzymeAdapterUtils.assertDomAvailable)('mount');
        if (FiberTags === null) {
          // Requires DOM.
          FiberTags = (0, _detectFiberTags2['default'])();
        }
        var attachTo = options.attachTo,
            hydrateIn = options.hydrateIn;

        var domNode = hydrateIn || attachTo || global.document.createElement('div');
        var instance = null;
        var adapter = this;
        return {
          render: function () {
            function render(el, context, callback) {
              if (instance === null) {
                var type = el.type,
                    props = el.props,
                    ref = el.ref;

                var wrapperProps = (0, _object2['default'])({
                  Component: type,
                  props: props,
                  context: context
                }, ref && { ref: ref });
                var ReactWrapperComponent = (0, _enzymeAdapterUtils.createMountWrapper)(el, (0, _object2['default'])({}, options, { adapter: adapter }));
                var wrappedEl = _react2['default'].createElement(ReactWrapperComponent, wrapperProps);
                instance = hydrateIn ? _reactDom2['default'].hydrate(wrappedEl, domNode) : _reactDom2['default'].render(wrappedEl, domNode);
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
          simulateError: function () {
            function simulateError(nodeHierarchy, rootNode, error) {
              var _ref = nodeHierarchy.find(function (x) {
                return x.instance && x.instance.componentDidCatch;
              }) || {},
                  catchingInstance = _ref.instance;

              (0, _enzymeAdapterUtils.simulateError)(error, catchingInstance, rootNode, nodeHierarchy, nodeTypeFromType, adapter.displayNameOfNode);
            }

            return simulateError;
          }(),
          simulateEvent: function () {
            function simulateEvent(node, event, mock) {
              var mappedEvent = (0, _enzymeAdapterUtils.mapNativeEventNames)(event, eventOptions);
              var eventFn = _testUtils2['default'].Simulate[mappedEvent];
              if (!eventFn) {
                throw new TypeError('ReactWrapper::simulate() event \'' + String(event) + '\' does not exist');
              }
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
        var adapter = this;
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
                var Component = el.type;


                var isStateful = Component.prototype && (Component.prototype.isReactComponent || Array.isArray(Component.__reactAutoBindPairs) // fallback for createClass components
                );

                if (!isStateful && typeof Component === 'function') {
                  var wrappedEl = (0, _object2['default'])(function () {
                    return Component.apply(undefined, arguments);
                  }, // eslint-disable-line new-cap
                  Component);
                  return (0, _enzymeAdapterUtils.withSetStateAllowed)(function () {
                    return renderer.render((0, _object2['default'])({}, el, { type: wrappedEl }), context);
                  });
                }
                if (isStateful) {
                  // fix react bug; see implementation of `getEmptyStateValue`
                  var emptyStateValue = getEmptyStateValue();
                  if (emptyStateValue) {
                    Object.defineProperty(Component.prototype, 'state', {
                      configurable: true,
                      enumerable: true,
                      get: function () {
                        function get() {
                          return null;
                        }

                        return get;
                      }(),
                      set: function () {
                        function set(value) {
                          if (value !== emptyStateValue) {
                            Object.defineProperty(this, 'state', {
                              configurable: true,
                              enumerable: true,
                              value: value,
                              writable: true
                            });
                          }
                          return true;
                        }

                        return set;
                      }()
                    });
                  }
                }
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
                return elementToTree(cachedNode);
              }
              var output = renderer.getRenderOutput();
              return {
                nodeType: nodeTypeFromType(cachedNode.type),
                type: cachedNode.type,
                props: cachedNode.props,
                key: (0, _enzymeAdapterUtils.ensureKeyOrUndefined)(cachedNode.key),
                ref: cachedNode.ref,
                instance: renderer._instance,
                rendered: Array.isArray(output) ? flatten(output).map(function (el) {
                  return elementToTree(el);
                }) : elementToTree(output)
              };
            }

            return getNode;
          }(),
          simulateError: function () {
            function simulateError(nodeHierarchy, rootNode, error) {
              (0, _enzymeAdapterUtils.simulateError)(error, renderer._instance, cachedNode, nodeHierarchy.concat(cachedNode), nodeTypeFromType, adapter.displayNameOfNode);
            }

            return simulateError;
          }(),
          simulateEvent: function () {
            function simulateEvent(node, event) {
              for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
              }

              var handler = node.props[(0, _enzymeAdapterUtils.propFromEvent)(event, eventOptions)];
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
    // eslint-disable-next-line class-methods-use-this

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
    // eslint-disable-next-line class-methods-use-this

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
        return elementToTree(element);
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
    key: 'displayNameOfNode',
    value: function () {
      function displayNameOfNode(node) {
        if (!node) return null;
        var type = node.type,
            $$typeof = node.$$typeof;


        var nodeType = type || $$typeof;

        // newer node types may be undefined, so only test if the nodeType exists
        if (nodeType) {
          switch (nodeType) {
            case _reactIs.AsyncMode || NaN:
              return 'AsyncMode';
            case _reactIs.Fragment || NaN:
              return 'Fragment';
            case _reactIs.StrictMode || NaN:
              return 'StrictMode';
            case _reactIs.Profiler || NaN:
              return 'Profiler';
            case _reactIs.Portal || NaN:
              return 'Portal';
            default:
          }
        }

        var $$typeofType = type && type.$$typeof;

        switch ($$typeofType) {
          case _reactIs.ContextConsumer || NaN:
            return 'ContextConsumer';
          case _reactIs.ContextProvider || NaN:
            return 'ContextProvider';
          case _reactIs.ForwardRef || NaN:
            {
              if (type.displayName) {
                return type.displayName;
              }
              var name = type.render.displayName || (0, _functionPrototype2['default'])(type.render);
              return name ? 'ForwardRef(' + String(name) + ')' : 'ForwardRef';
            }
          default:
            return (0, _enzymeAdapterUtils.displayNameOfNode)(node);
        }
      }

      return displayNameOfNode;
    }()
  }, {
    key: 'isValidElement',
    value: function () {
      function isValidElement(element) {
        return (0, _reactIs.isElement)(element);
      }

      return isValidElement;
    }()
  }, {
    key: 'isValidElementType',
    value: function () {
      function isValidElementType(object) {
        return (0, _reactIs.isValidElementType)(object);
      }

      return isValidElementType;
    }()
  }, {
    key: 'isFragment',
    value: function () {
      function isFragment(fragment) {
        return (0, _Utils.typeOfNode)(fragment) === _reactIs.Fragment;
      }

      return isFragment;
    }()
  }, {
    key: 'isCustomComponentElement',
    value: function () {
      function isCustomComponentElement(inst) {
        if (!inst || !this.isValidElement(inst)) {
          return false;
        }
        return typeof inst.type === 'function' || (0, _reactIs.isForwardRef)(inst);
      }

      return isCustomComponentElement;
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