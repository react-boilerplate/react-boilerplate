'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _arrayPrototype = require('array.prototype.flat');

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _Utils = require('./Utils');

var _getAdapter = require('./getAdapter');

var _getAdapter2 = _interopRequireDefault(_getAdapter);

var _Debug = require('./Debug');

var _RSTTraversal = require('./RSTTraversal');

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NODE = (0, _Utils.sym)('__node__');
var NODES = (0, _Utils.sym)('__nodes__');
var RENDERER = (0, _Utils.sym)('__renderer__');
var UNRENDERED = (0, _Utils.sym)('__unrendered__');
var ROOT = (0, _Utils.sym)('__root__');
var OPTIONS = (0, _Utils.sym)('__options__');
var SET_STATE = (0, _Utils.sym)('__setState__');
var ROOT_NODES = (0, _Utils.sym)('__rootNodes__');

/**
 * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
 * function.
 *
 * @param {ShallowWrapper} wrapper
 * @param {Function} predicate
 * @param {Function} filter
 * @returns {ShallowWrapper}
 */
function findWhereUnwrapped(wrapper, predicate) {
  var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _RSTTraversal.treeFilter;

  return wrapper.flatMap(function (n) {
    return filter(n.getNodeInternal(), predicate);
  });
}

/**
 * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
 * the provided predicate function.
 *
 * @param {ShallowWrapper} wrapper
 * @param {Function} predicate
 * @returns {ShallowWrapper}
 */
function filterWhereUnwrapped(wrapper, predicate) {
  return wrapper.wrap(wrapper.getNodesInternal().filter(predicate).filter(Boolean));
}

/**
 * Ensure options passed to ShallowWrapper are valid. Throws otherwise.
 * @param {Object} options
 */
function validateOptions(options) {
  var lifecycleExperimental = options.lifecycleExperimental,
      disableLifecycleMethods = options.disableLifecycleMethods,
      enableComponentDidUpdateOnSetState = options.enableComponentDidUpdateOnSetState,
      supportPrevContextArgumentOfComponentDidUpdate = options.supportPrevContextArgumentOfComponentDidUpdate,
      lifecycles = options.lifecycles;

  if (typeof lifecycleExperimental !== 'undefined' && typeof lifecycleExperimental !== 'boolean') {
    throw new Error('lifecycleExperimental must be either true or false if provided');
  }

  if (typeof disableLifecycleMethods !== 'undefined' && typeof disableLifecycleMethods !== 'boolean') {
    throw new Error('disableLifecycleMethods must be either true or false if provided');
  }

  if (lifecycleExperimental != null && disableLifecycleMethods != null && lifecycleExperimental === disableLifecycleMethods) {
    throw new Error('lifecycleExperimental and disableLifecycleMethods cannot be set to the same value');
  }

  if (typeof enableComponentDidUpdateOnSetState !== 'undefined' && lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.onSetState !== enableComponentDidUpdateOnSetState) {
    throw new TypeError('the legacy enableComponentDidUpdateOnSetState option should be matched by `lifecycles: { componentDidUpdate: { onSetState: true } }`, for compatibility');
  }

  if (typeof supportPrevContextArgumentOfComponentDidUpdate !== 'undefined' && lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.prevContext !== supportPrevContextArgumentOfComponentDidUpdate) {
    throw new TypeError('the legacy supportPrevContextArgumentOfComponentDidUpdate option should be matched by `lifecycles: { componentDidUpdate: { prevContext: true } }`, for compatibility');
  }
}

function getAdapterLifecycles(_ref) {
  var options = _ref.options;
  var _options$lifecycles = options.lifecycles,
      lifecycles = _options$lifecycles === undefined ? {} : _options$lifecycles,
      enableComponentDidUpdateOnSetState = options.enableComponentDidUpdateOnSetState,
      supportPrevContextArgumentOfComponentDidUpdate = options.supportPrevContextArgumentOfComponentDidUpdate;


  var hasLegacySetStateArg = typeof enableComponentDidUpdateOnSetState !== 'undefined';
  var hasLegacyPrevContextArg = typeof supportPrevContextArgumentOfComponentDidUpdate !== 'undefined';
  var componentDidUpdate = hasLegacySetStateArg || hasLegacyPrevContextArg ? (0, _object2['default'])({}, hasLegacySetStateArg && {
    onSetState: !!enableComponentDidUpdateOnSetState
  }, hasLegacyPrevContextArg && {
    prevContext: !!supportPrevContextArgumentOfComponentDidUpdate
  }) : null;

  return (0, _object2['default'])({}, lifecycles, {
    setState: (0, _object2['default'])({}, lifecycles.setState)
  }, componentDidUpdate && { componentDidUpdate: componentDidUpdate });
}

function getRootNode(node) {
  if (node.nodeType === 'host') {
    return node;
  }
  return node.rendered;
}

function getRootNodeInternal(wrapper) {
  if (wrapper[ROOT].length !== 1) {
    throw new Error('getRootNodeInternal(wrapper) can only be called when wrapper wraps one node');
  }
  if (wrapper[ROOT] !== wrapper) {
    return wrapper[ROOT_NODES][0];
  }
  return wrapper[ROOT][NODE];
}

function nodeParents(wrapper, node) {
  return (0, _RSTTraversal.parentsOfNode)(node, getRootNodeInternal(wrapper));
}

function privateSetNodes(wrapper, nodes) {
  if (!Array.isArray(nodes)) {
    (0, _Utils.privateSet)(wrapper, NODE, nodes);
    (0, _Utils.privateSet)(wrapper, NODES, [nodes]);
  } else {
    (0, _Utils.privateSet)(wrapper, NODE, nodes[0]);
    (0, _Utils.privateSet)(wrapper, NODES, nodes);
  }
  (0, _Utils.privateSet)(wrapper, 'length', wrapper[NODES].length);
}

function pureComponentShouldComponentUpdate(prevProps, props, prevState, state) {
  return !(0, _lodash2['default'])(prevProps, props) || !(0, _lodash2['default'])(prevState, state);
}

function isPureComponent(instance) {
  return instance && instance.isPureReactComponent;
}

/**
 * @class ShallowWrapper
 */

var ShallowWrapper = function () {
  function ShallowWrapper(nodes, root) {
    var _this = this;

    var passedOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ShallowWrapper);

    validateOptions(passedOptions);

    var options = (0, _Utils.makeOptions)(passedOptions);
    var adapter = (0, _getAdapter2['default'])(options);
    var lifecycles = getAdapterLifecycles(adapter);

    // mounting a ShallowRender component
    if (!root) {
      if (!adapter.isValidElement(nodes)) {
        throw new TypeError('ShallowWrapper can only wrap valid elements');
      }

      (0, _Utils.privateSet)(this, ROOT, this);
      (0, _Utils.privateSet)(this, UNRENDERED, nodes);
      var renderer = adapter.createRenderer((0, _object2['default'])({ mode: 'shallow' }, options));
      (0, _Utils.privateSet)(this, RENDERER, renderer);
      this[RENDERER].render(nodes, options.context);
      var renderedNode = this[RENDERER].getNode();
      privateSetNodes(this, getRootNode(renderedNode));
      (0, _Utils.privateSet)(this, OPTIONS, options);

      var instance = renderedNode.instance;

      if (instance && !options.disableLifecycleMethods) {
        // Ensure to call componentDidUpdate when instance.setState is called
        if (lifecycles.componentDidUpdate.onSetState && !instance[SET_STATE]) {
          (0, _Utils.privateSet)(instance, SET_STATE, instance.setState);
          instance.setState = function (updater) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            return _this.setState.apply(_this, _toConsumableArray(callback == null ? [updater] : [updater, callback]));
          };
        }

        if (typeof instance.componentDidMount === 'function') {
          this[RENDERER].batchedUpdates(function () {
            instance.componentDidMount();
          });
        }
      }
      // creating a child component through enzyme's ShallowWrapper APIs.
    } else {
      (0, _Utils.privateSet)(this, ROOT, root);
      (0, _Utils.privateSet)(this, UNRENDERED, null);
      (0, _Utils.privateSet)(this, RENDERER, root[RENDERER]);
      privateSetNodes(this, nodes);
      (0, _Utils.privateSet)(this, OPTIONS, root[OPTIONS]);
      (0, _Utils.privateSet)(this, ROOT_NODES, root[NODES]);
    }
  }

  /**
   * Returns the root wrapper
   *
   * @return {ShallowWrapper}
   */


  _createClass(ShallowWrapper, [{
    key: 'root',
    value: function () {
      function root() {
        return this[ROOT];
      }

      return root;
    }()

    /**
     * Returns the wrapped component.
     *
     * @return {ReactComponent}
     */

  }, {
    key: 'getNodeInternal',
    value: function () {
      function getNodeInternal() {
        if (this.length !== 1) {
          throw new Error('ShallowWrapper::getNode() can only be called when wrapping one node');
        }
        if (this[ROOT] === this) {
          this.update();
        }
        return this[NODE];
      }

      return getNodeInternal;
    }()

    /**
     * Returns the the wrapped components.
     *
     * @return {Array<ReactComponent>}
     */

  }, {
    key: 'getNodesInternal',
    value: function () {
      function getNodesInternal() {
        if (this[ROOT] === this && this.length === 1) {
          this.update();
        }
        return this[NODES];
      }

      return getNodesInternal;
    }()

    /**
     * Returns the wrapped ReactElement.
     *
     * @return {ReactElement}
     */

  }, {
    key: 'getElement',
    value: function () {
      function getElement() {
        var _this2 = this;

        return this.single('getElement', function (n) {
          return (0, _getAdapter2['default'])(_this2[OPTIONS]).nodeToElement(n);
        });
      }

      return getElement;
    }()

    /**
     * Returns the wrapped ReactElements.
     *
     * @return {Array<ReactElement>}
     */

  }, {
    key: 'getElements',
    value: function () {
      function getElements() {
        return this.getNodesInternal().map((0, _getAdapter2['default'])(this[OPTIONS]).nodeToElement);
      }

      return getElements;
    }()

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'getNode',
    value: function () {
      function getNode() {
        throw new Error('ShallowWrapper::getNode() is no longer supported. Use ShallowWrapper::getElement() instead');
      }

      return getNode;
    }()

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'getNodes',
    value: function () {
      function getNodes() {
        throw new Error('ShallowWrapper::getNodes() is no longer supported. Use ShallowWrapper::getElements() instead');
      }

      return getNodes;
    }()

    /**
     * Gets the instance of the component being rendered as the root node passed into `shallow()`.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * const inst = wrapper.instance();
     * expect(inst).to.be.instanceOf(MyComponent);
     * ```
     * @returns {ReactComponent}
     */

  }, {
    key: 'instance',
    value: function () {
      function instance() {
        if (this[ROOT] !== this) {
          throw new Error('ShallowWrapper::instance() can only be called on the root');
        }
        return this[RENDERER].getNode().instance;
      }

      return instance;
    }()

    /**
     * Forces a re-render. Useful to run before checking the render output if something external
     * may be updating the state of the component somewhere.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'update',
    value: function () {
      function update() {
        if (this[ROOT] !== this) {
          throw new Error('ShallowWrapper::update() can only be called on the root');
        }
        if (this.length !== 1) {
          throw new Error('ShallowWrapper::update() can only be called when wrapping one node');
        }
        privateSetNodes(this, getRootNode(this[RENDERER].getNode()));
        return this;
      }

      return update;
    }()

    /**
     * A method that unmounts the component. This can be used to simulate a component going through
     * and unmount/mount lifecycle.
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'unmount',
    value: function () {
      function unmount() {
        this[RENDERER].unmount();
        return this;
      }

      return unmount;
    }()

    /**
     * A method is for re-render with new props and context.
     * This calls componentDidUpdate method if disableLifecycleMethods is not enabled.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} props
     * @param {Object} context
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'rerender',
    value: function () {
      function rerender(props, context) {
        var _this3 = this;

        var adapter = (0, _getAdapter2['default'])(this[OPTIONS]);
        this.single('rerender', function () {
          (0, _Utils.withSetStateAllowed)(function () {
            // NOTE(lmr): In react 16, instances will be null for SFCs, but
            // rerendering with props/context is still a valid thing to do. In
            // this case, state will be undefined, but props/context will exist.
            var instance = _this3.instance() || {};
            var state = instance.state;

            var prevProps = instance.props || _this3[UNRENDERED].props;
            var prevContext = instance.context || _this3[OPTIONS].context;
            var nextContext = context || prevContext;
            if (context) {
              _this3[OPTIONS] = (0, _object2['default'])({}, _this3[OPTIONS], { context: nextContext });
            }
            _this3[RENDERER].batchedUpdates(function () {
              // When shouldComponentUpdate returns false we shouldn't call componentDidUpdate.
              // so we spy shouldComponentUpdate to get the result.
              var shouldRender = true;
              var spy = void 0;
              if (!_this3[OPTIONS].disableLifecycleMethods && instance && typeof instance.shouldComponentUpdate === 'function') {
                spy = (0, _Utils.spyMethod)(instance, 'shouldComponentUpdate');
              } else if (isPureComponent(instance)) {
                shouldRender = pureComponentShouldComponentUpdate(prevProps, props, state, instance.state);
              }
              if (props) _this3[UNRENDERED] = (0, _Utils.cloneElement)(adapter, _this3[UNRENDERED], props);
              _this3[RENDERER].render(_this3[UNRENDERED], nextContext);
              if (spy) {
                shouldRender = spy.getLastReturnValue();
                spy.restore();
              }
              if (shouldRender && !_this3[OPTIONS].disableLifecycleMethods && instance) {
                var lifecycles = getAdapterLifecycles(adapter);

                if (lifecycles.getSnapshotBeforeUpdate) {
                  var snapshot = void 0;
                  if (typeof instance.getSnapshotBeforeUpdate === 'function') {
                    snapshot = instance.getSnapshotBeforeUpdate(prevProps, state);
                  }
                  if (lifecycles.componentDidUpdate && typeof instance.componentDidUpdate === 'function') {
                    instance.componentDidUpdate(prevProps, state, snapshot);
                  }
                } else if (lifecycles.componentDidUpdate && typeof instance.componentDidUpdate === 'function') {
                  if (lifecycles.componentDidUpdate.prevContext) {
                    instance.componentDidUpdate(prevProps, state, prevContext);
                  } else {
                    instance.componentDidUpdate(prevProps, state);
                  }
                }
                // If it doesn't need to rerender, update only its props.
              } else if (!(0, _lodash2['default'])(props, instance.props)) {
                instance.props = (Object.freeze || Object)((0, _object2['default'])({}, instance.props, props));
              }
              _this3.update();
            });
          });
        });
        return this;
      }

      return rerender;
    }()

    /**
     * A method that sets the props of the root component, and re-renders. Useful for when you are
     * wanting to test how the component behaves over time with changing props. Calling this, for
     * instance, will call the `componentWillReceiveProps` lifecycle method.
     *
     * Similar to `setState`, this method accepts a props object and will merge it in with the already
     * existing props.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} props object
     * @param {Function} cb - callback function
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'setProps',
    value: function () {
      function setProps(props) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (this[ROOT] !== this) {
          throw new Error('ShallowWrapper::setProps() can only be called on the root');
        }
        if (arguments.length > 1 && typeof callback !== 'function') {
          throw new TypeError('ReactWrapper::setProps() expects a function as its second argument');
        }
        this.rerender(props);
        if (callback) {
          callback();
        }
        return this;
      }

      return setProps;
    }()

    /**
     * A method to invoke `setState` on the root component instance similar to how you might in the
     * definition of the component, and re-renders.  This method is useful for testing your component
     * in hard to achieve states, however should be used sparingly. If possible, you should utilize
     * your component's external API in order to get it into whatever state you want to test, in order
     * to be as accurate of a test as possible. This is not always practical, however.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} state to merge
     * @param {Function} cb - callback function
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'setState',
    value: function () {
      function setState(state) {
        var _this4 = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (this[ROOT] !== this) {
          throw new Error('ShallowWrapper::setState() can only be called on the root');
        }
        if (this.instance() === null || this[RENDERER].getNode().nodeType !== 'class') {
          throw new Error('ShallowWrapper::setState() can only be called on class components');
        }
        if (arguments.length > 1 && typeof callback !== 'function') {
          throw new TypeError('ReactWrapper::setState() expects a function as its second argument');
        }

        this.single('setState', function () {
          (0, _Utils.withSetStateAllowed)(function () {
            var adapter = (0, _getAdapter2['default'])(_this4[OPTIONS]);

            var lifecycles = getAdapterLifecycles(adapter);

            var instance = _this4.instance();
            var prevProps = instance.props;
            var prevState = instance.state;
            var prevContext = instance.context;

            var statePayload = typeof state === 'function' ? state.call(instance, prevState, prevProps) : state;

            // returning null or undefined prevents the update in React 16+
            // https://github.com/facebook/react/pull/12756
            var maybeHasUpdate = !lifecycles.setState.skipsComponentDidUpdateOnNullish || statePayload != null;

            // When shouldComponentUpdate returns false we shouldn't call componentDidUpdate.
            // so we spy shouldComponentUpdate to get the result.
            var spy = void 0;
            var shouldRender = true;
            if (!_this4[OPTIONS].disableLifecycleMethods && lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.onSetState && instance && typeof instance.shouldComponentUpdate === 'function') {
              spy = (0, _Utils.spyMethod)(instance, 'shouldComponentUpdate');
            } else if (isPureComponent(instance)) {
              shouldRender = pureComponentShouldComponentUpdate(prevProps, instance.props, prevState, statePayload);
            }
            // We don't pass the setState callback here
            // to guarantee to call the callback after finishing the render
            if (instance[SET_STATE]) {
              instance[SET_STATE](statePayload);
            } else {
              instance.setState(statePayload);
            }
            if (spy) {
              shouldRender = spy.getLastReturnValue();
              spy.restore();
            }
            if (maybeHasUpdate && shouldRender && !_this4[OPTIONS].disableLifecycleMethods && lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.onSetState && instance) {
              if (lifecycles.getSnapshotBeforeUpdate && typeof instance.getSnapshotBeforeUpdate === 'function') {
                var snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState);
                if (typeof instance.componentDidUpdate === 'function') {
                  instance.componentDidUpdate(prevProps, prevState, snapshot);
                }
              } else if (typeof instance.componentDidUpdate === 'function') {
                if (lifecycles.componentDidUpdate.prevContext) {
                  instance.componentDidUpdate(prevProps, prevState, prevContext);
                } else {
                  instance.componentDidUpdate(prevProps, prevState);
                }
              }
            }
            _this4.update();
            // call the setState callback
            if (callback) {
              if (adapter.invokeSetStateCallback) {
                adapter.invokeSetStateCallback(instance, callback);
              } else {
                callback.call(instance);
              }
            }
          });
        });
        return this;
      }

      return setState;
    }()

    /**
     * A method that sets the context of the root component, and re-renders. Useful for when you are
     * wanting to test how the component behaves over time with changing contexts.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} context object
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'setContext',
    value: function () {
      function setContext(context) {
        if (this[ROOT] !== this) {
          throw new Error('ShallowWrapper::setContext() can only be called on the root');
        }
        if (!this[OPTIONS].context) {
          throw new Error('ShallowWrapper::setContext() can only be called on a wrapper that was originally passed a context option');
        }
        return this.rerender(null, context);
      }

      return setContext;
    }()

    /**
     * Whether or not a given react element exists in the shallow render tree.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.contains(<div className="foo bar" />)).to.equal(true);
     * ```
     *
     * @param {ReactElement|Array<ReactElement>} nodeOrNodes
     * @returns {Boolean}
     */

  }, {
    key: 'contains',
    value: function () {
      function contains(nodeOrNodes) {
        var adapter = (0, _getAdapter2['default'])(this[OPTIONS]);
        if (!(0, _Utils.isReactElementAlike)(nodeOrNodes, adapter)) {
          throw new Error('ShallowWrapper::contains() can only be called with ReactElement (or array of them), string or number as argument.');
        }
        var predicate = Array.isArray(nodeOrNodes) ? function (other) {
          return (0, _Utils.containsChildrenSubArray)(_Utils.nodeEqual, other, nodeOrNodes.map(function (node) {
            return adapter.elementToNode(node);
          }));
        } : function (other) {
          return (0, _Utils.nodeEqual)(adapter.elementToNode(nodeOrNodes), other);
        };

        return findWhereUnwrapped(this, predicate).length > 0;
      }

      return contains;
    }()

    /**
     * Whether or not a given react element exists in the shallow render tree.
     * Match is based on the expected element and not on wrappers element.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * // MyComponent outputs <div><div class="foo">Hello</div></div>
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.containsMatchingElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */

  }, {
    key: 'containsMatchingElement',
    value: function () {
      function containsMatchingElement(node) {
        var adapter = (0, _getAdapter2['default'])(this[OPTIONS]);
        var rstNode = adapter.elementToNode(node);
        var predicate = function () {
          function predicate(other) {
            return (0, _Utils.nodeMatches)(rstNode, other, function (a, b) {
              return a <= b;
            });
          }

          return predicate;
        }();
        return findWhereUnwrapped(this, predicate).length > 0;
      }

      return containsMatchingElement;
    }()

    /**
     * Whether or not all the given react elements exists in the shallow render tree.
     * Match is based on the expected element and not on wrappers element.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.containsAllMatchingElements([
     *   <div>Hello</div>,
     *   <div>Goodbye</div>,
     * ])).to.equal(true);
     * ```
     *
     * @param {Array<ReactElement>} nodes
     * @returns {Boolean}
     */

  }, {
    key: 'containsAllMatchingElements',
    value: function () {
      function containsAllMatchingElements(nodes) {
        var _this5 = this;

        if (!Array.isArray(nodes)) {
          throw new TypeError('nodes should be an Array');
        }

        return nodes.every(function (node) {
          return _this5.containsMatchingElement(node);
        });
      }

      return containsAllMatchingElements;
    }()

    /**
     * Whether or not one of the given react elements exists in the shallow render tree.
     * Match is based on the expected element and not on wrappers element.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.containsAnyMatchingElements([
     *   <div>Hello</div>,
     *   <div>Goodbye</div>,
     * ])).to.equal(true);
     * ```
     *
     * @param {Array<ReactElement>} nodes
     * @returns {Boolean}
     */

  }, {
    key: 'containsAnyMatchingElements',
    value: function () {
      function containsAnyMatchingElements(nodes) {
        var _this6 = this;

        return Array.isArray(nodes) && nodes.some(function (node) {
          return _this6.containsMatchingElement(node);
        });
      }

      return containsAnyMatchingElements;
    }()

    /**
     * Whether or not a given react element exists in the render tree.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.contains(<div className="foo bar" />)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */

  }, {
    key: 'equals',
    value: function () {
      function equals(node) {
        var _this7 = this;

        return this.single('equals', function () {
          return (0, _Utils.nodeEqual)(_this7.getNodeInternal(), node);
        });
      }

      return equals;
    }()

    /**
     * Whether or not a given react element matches the render tree.
     * Match is based on the expected element and not on wrapper root node.
     * It will determine if the wrapper root node "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrapper root node and equals to each other.
     *
     * Example:
     * ```
     * // MyComponent outputs <div class="foo">Hello</div>
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.matchesElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */

  }, {
    key: 'matchesElement',
    value: function () {
      function matchesElement(node) {
        var _this8 = this;

        return this.single('matchesElement', function () {
          var adapter = (0, _getAdapter2['default'])(_this8[OPTIONS]);
          var rstNode = adapter.elementToNode(node);
          return (0, _Utils.nodeMatches)(rstNode, _this8.getNodeInternal(), function (a, b) {
            return a <= b;
          });
        });
      }

      return matchesElement;
    }()

    /**
     * Finds every node in the render tree of the current wrapper that matches the provided selector.
     *
     * @param {String|Function} selector
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'find',
    value: function () {
      function find(selector) {
        return this.wrap((0, _selectors.reduceTreesBySelector)(selector, this.getNodesInternal()));
      }

      return find;
    }()

    /**
     * Returns whether or not current node matches a provided selector.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String|Function} selector
     * @returns {boolean}
     */

  }, {
    key: 'is',
    value: function () {
      function is(selector) {
        var predicate = (0, _selectors.buildPredicate)(selector);
        return this.single('is', function (n) {
          return predicate(n);
        });
      }

      return is;
    }()

    /**
     * Returns true if the component rendered nothing, i.e., null or false.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isEmptyRender',
    value: function () {
      function isEmptyRender() {
        return this.type() === null;
      }

      return isEmptyRender;
    }()

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided predicate function. The predicate should receive a wrapped node as its first
     * argument.
     *
     * @param {Function} predicate
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'filterWhere',
    value: function () {
      function filterWhere(predicate) {
        var _this9 = this;

        return filterWhereUnwrapped(this, function (n) {
          return predicate(_this9.wrap(n));
        });
      }

      return filterWhere;
    }()

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided selector.
     *
     * @param {String|Function} selector
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'filter',
    value: function () {
      function filter(selector) {
        var predicate = (0, _selectors.buildPredicate)(selector);
        return filterWhereUnwrapped(this, predicate);
      }

      return filter;
    }()

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper that did not match
     * the provided selector. Essentially the inverse of `filter`.
     *
     * @param {String|Function} selector
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'not',
    value: function () {
      function not(selector) {
        var predicate = (0, _selectors.buildPredicate)(selector);
        return filterWhereUnwrapped(this, function (n) {
          return !predicate(n);
        });
      }

      return not;
    }()

    /**
     * Returns a string of the rendered text of the current render tree.  This function should be
     * looked at with skepticism if being used to test what the actual HTML output of the component
     * will be. If that is what you would like to test, use enzyme's `render` function instead.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {String}
     */

  }, {
    key: 'text',
    value: function () {
      function text() {
        return this.single('text', _RSTTraversal.getTextFromNode);
      }

      return text;
    }()

    /**
     * Returns the HTML of the node.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {String}
     */

  }, {
    key: 'html',
    value: function () {
      function html() {
        var _this10 = this;

        return this.single('html', function (n) {
          if (_this10.type() === null) return null;
          var adapter = (0, _getAdapter2['default'])(_this10[OPTIONS]);
          var renderer = adapter.createRenderer((0, _object2['default'])({}, _this10[OPTIONS], { mode: 'string' }));
          return renderer.render(adapter.nodeToElement(n));
        });
      }

      return html;
    }()

    /**
     * Returns the current node rendered to HTML and wrapped in a CheerioWrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {CheerioWrapper}
     */

  }, {
    key: 'render',
    value: function () {
      function render() {
        return this.type() === null ? (0, _cheerio2['default'])() : _cheerio2['default'].load('')(this.html());
      }

      return render;
    }()

    /**
     * Used to simulate events. Pass an eventname and (optionally) event arguments. This method of
     * testing events should be met with some skepticism.
     *
     * @param {String} event
     * @param {Array} args
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'simulate',
    value: function () {
      function simulate(event) {
        var _this11 = this;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return this.single('simulate', function (n) {
          var _RENDERER;

          (_RENDERER = _this11[RENDERER]).simulateEvent.apply(_RENDERER, [n, event].concat(args));
          _this11[ROOT].update();
          return _this11;
        });
      }

      return simulate;
    }()

    /**
     * Used to simulate throwing a rendering error. Pass an error to throw.
     *
     * @param {String} error
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'simulateError',
    value: function () {
      function simulateError(error) {
        var _this12 = this;

        // in shallow, the "root" is the "rendered" thing.

        return this.single('simulateError', function (thisNode) {
          if (thisNode.nodeType === 'host') {
            throw new TypeError('ShallowWrapper::simulateError() can only be called on custom components');
          }

          var renderer = _this12[RENDERER];
          if (typeof renderer.simulateError !== 'function') {
            throw new TypeError('your adapter does not support `simulateError`. Try upgrading it!');
          }

          var rootNode = getRootNodeInternal(_this12);
          var nodeHierarchy = [thisNode].concat(nodeParents(_this12, thisNode));
          renderer.simulateError(nodeHierarchy, rootNode, error);

          return _this12;
        });
      }

      return simulateError;
    }()

    /**
     * Returns the props hash for the current node of the wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {Object}
     */

  }, {
    key: 'props',
    value: function () {
      function props() {
        return this.single('props', _RSTTraversal.propsOfNode);
      }

      return props;
    }()

    /**
     * Returns the state hash for the root node of the wrapper. Optionally pass in a prop name and it
     * will return just that value.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} name (optional)
     * @returns {*}
     */

  }, {
    key: 'state',
    value: function () {
      function state(name) {
        var _this13 = this;

        if (this[ROOT] !== this) {
          throw new Error('ShallowWrapper::state() can only be called on the root');
        }
        if (this.instance() === null || this[RENDERER].getNode().nodeType !== 'class') {
          throw new Error('ShallowWrapper::state() can only be called on class components');
        }
        var _state = this.single('state', function () {
          return _this13.instance().state;
        });
        if (typeof name !== 'undefined') {
          if (_state == null) {
            throw new TypeError('ShallowWrapper::state("' + String(name) + '") requires that `state` not be `null` or `undefined`');
          }
          return _state[name];
        }
        return _state;
      }

      return state;
    }()

    /**
     * Returns the context hash for the root node of the wrapper.
     * Optionally pass in a prop name and it will return just that value.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} name (optional)
     * @returns {*}
     */

  }, {
    key: 'context',
    value: function () {
      function context(name) {
        var _this14 = this;

        if (this[ROOT] !== this) {
          throw new Error('ShallowWrapper::context() can only be called on the root');
        }
        if (!this[OPTIONS].context) {
          throw new Error('ShallowWrapper::context() can only be called on a wrapper that was originally passed a context option');
        }
        if (this.instance() === null) {
          throw new Error('ShallowWrapper::context() can only be called on wrapped nodes that have a non-null instance');
        }
        var _context = this.single('context', function () {
          return _this14.instance().context;
        });
        if (name) {
          return _context[name];
        }
        return _context;
      }

      return context;
    }()

    /**
     * Returns a new wrapper with all of the children of the current wrapper.
     *
     * @param {String|Function} [selector]
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'children',
    value: function () {
      function children(selector) {
        var allChildren = this.flatMap(function (n) {
          return (0, _RSTTraversal.childrenOfNode)(n.getNodeInternal());
        });
        return selector ? allChildren.filter(selector) : allChildren;
      }

      return children;
    }()

    /**
     * Returns a new wrapper with a specific child
     *
     * @param {Number} [index]
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'childAt',
    value: function () {
      function childAt(index) {
        var _this15 = this;

        return this.single('childAt', function () {
          return _this15.children().at(index);
        });
      }

      return childAt;
    }()

    /**
     * Returns a wrapper around all of the parents/ancestors of the wrapper. Does not include the node
     * in the current wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String|Function} [selector]
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'parents',
    value: function () {
      function parents(selector) {
        var _this16 = this;

        return this.single('parents', function (n) {
          var allParents = _this16.wrap(nodeParents(_this16, n));
          return selector ? allParents.filter(selector) : allParents;
        });
      }

      return parents;
    }()

    /**
     * Returns a wrapper around the immediate parent of the current node.
     *
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'parent',
    value: function () {
      function parent() {
        return this.flatMap(function (n) {
          return [n.parents().get(0)];
        });
      }

      return parent;
    }()

    /**
     *
     * @param {String|Function} selector
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'closest',
    value: function () {
      function closest(selector) {
        if (this.is(selector)) {
          return this;
        }
        var matchingAncestors = this.parents().filter(selector);
        return matchingAncestors.length > 0 ? matchingAncestors.first() : this.findWhere(function () {
          return false;
        });
      }

      return closest;
    }()

    /**
     * Shallow renders the current node and returns a shallow wrapper around it.
     *
     * NOTE: can only be called on wrapper of a single node.
     *
     * @param {Object} options
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'shallow',
    value: function () {
      function shallow(options) {
        var _this17 = this;

        return this.single('shallow', function (n) {
          return _this17.wrap((0, _getAdapter2['default'])(_this17[OPTIONS]).nodeToElement(n), null, options);
        });
      }

      return shallow;
    }()

    /**
     * Returns the value of prop with the given name of the current node.
     *
     * @param propName
     * @returns {*}
     */

  }, {
    key: 'prop',
    value: function () {
      function prop(propName) {
        return this.props()[propName];
      }

      return prop;
    }()

    /**
     * Returns the key assigned to the current node.
     *
     * @returns {String}
     */

  }, {
    key: 'key',
    value: function () {
      function key() {
        return this.single('key', function (n) {
          return n.key === undefined ? null : n.key;
        });
      }

      return key;
    }()

    /**
     * Returns the type of the current node of this wrapper. If it's a composite component, this will
     * be the component constructor. If it's a native DOM node, it will be a string of the tag name.
     * If it's null, it will be null.
     *
     * @returns {String|Function|null}
     */

  }, {
    key: 'type',
    value: function () {
      function type() {
        return this.single('type', function (n) {
          return (0, _Utils.typeOfNode)(n);
        });
      }

      return type;
    }()

    /**
     * Returns the name of the current node of this wrapper.
     *
     * In order of precedence => type.displayName -> type.name -> type.
     *
     * @returns {String}
     */

  }, {
    key: 'name',
    value: function () {
      function name() {
        var adapter = (0, _getAdapter2['default'])(this[OPTIONS]);
        return this.single('name', function (n) {
          return adapter.displayNameOfNode ? adapter.displayNameOfNode(n) : (0, _Utils.displayNameOfNode)(n);
        });
      }

      return name;
    }()

    /**
     * Returns whether or not the current node has the given class name or not.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param className
     * @returns {Boolean}
     */

  }, {
    key: 'hasClass',
    value: function () {
      function hasClass(className) {
        if (className && className.indexOf('.') !== -1) {
          // eslint-disable-next-line no-console
          console.warn('It looks like you\'re calling `ShallowWrapper::hasClass()` with a CSS selector. hasClass() expects a class name, not a CSS selector.');
        }
        return this.single('hasClass', function (n) {
          return (0, _RSTTraversal.hasClassName)(n, className);
        });
      }

      return hasClass;
    }()

    /**
     * Iterates through each node of the current wrapper and executes the provided function with a
     * wrapper around the corresponding node passed in as the first argument.
     *
     * @param {Function} fn
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'forEach',
    value: function () {
      function forEach(fn) {
        var _this18 = this;

        this.getNodesInternal().forEach(function (n, i) {
          return fn.call(_this18, _this18.wrap(n), i);
        });
        return this;
      }

      return forEach;
    }()

    /**
     * Maps the current array of nodes to another array. Each node is passed in as a `ShallowWrapper`
     * to the map function.
     *
     * @param {Function} fn
     * @returns {Array}
     */

  }, {
    key: 'map',
    value: function () {
      function map(fn) {
        var _this19 = this;

        return this.getNodesInternal().map(function (n, i) {
          return fn.call(_this19, _this19.wrap(n), i);
        });
      }

      return map;
    }()

    /**
     * Reduces the current array of nodes to a value. Each node is passed in as a `ShallowWrapper`
     * to the reducer function.
     *
     * @param {Function} fn - the reducer function
     * @param {*} initialValue - the initial value
     * @returns {*}
     */

  }, {
    key: 'reduce',
    value: function () {
      function reduce(fn) {
        var _this20 = this;

        var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (arguments.length > 1) {
          return this.getNodesInternal().reduce(function (accum, n, i) {
            return fn.call(_this20, accum, _this20.wrap(n), i);
          }, initialValue);
        }
        return this.getNodesInternal().reduce(function (accum, n, i) {
          return fn.call(_this20, i === 1 ? _this20.wrap(accum) : accum, _this20.wrap(n), i);
        });
      }

      return reduce;
    }()

    /**
     * Reduces the current array of nodes to another array, from right to left. Each node is passed
     * in as a `ShallowWrapper` to the reducer function.
     *
     * @param {Function} fn - the reducer function
     * @param {*} initialValue - the initial value
     * @returns {*}
     */

  }, {
    key: 'reduceRight',
    value: function () {
      function reduceRight(fn) {
        var _this21 = this;

        var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (arguments.length > 1) {
          return this.getNodesInternal().reduceRight(function (accum, n, i) {
            return fn.call(_this21, accum, _this21.wrap(n), i);
          }, initialValue);
        }
        return this.getNodesInternal().reduceRight(function (accum, n, i) {
          return fn.call(_this21, i === 1 ? _this21.wrap(accum) : accum, _this21.wrap(n), i);
        });
      }

      return reduceRight;
    }()

    /**
     * Returns a new wrapper with a subset of the nodes of the original wrapper, according to the
     * rules of `Array#slice`.
     *
     * @param {Number} begin
     * @param {Number} end
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'slice',
    value: function () {
      function slice(begin, end) {
        return this.wrap(this.getNodesInternal().slice(begin, end));
      }

      return slice;
    }()

    /**
     * Returns whether or not any of the nodes in the wrapper match the provided selector.
     *
     * @param {Function|String} selector
     * @returns {Boolean}
     */

  }, {
    key: 'some',
    value: function () {
      function some(selector) {
        if (this[ROOT] === this) {
          throw new Error('ShallowWrapper::some() can not be called on the root');
        }
        var predicate = (0, _selectors.buildPredicate)(selector);
        return this.getNodesInternal().some(predicate);
      }

      return some;
    }()

    /**
     * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {Boolean}
     */

  }, {
    key: 'someWhere',
    value: function () {
      function someWhere(predicate) {
        var _this22 = this;

        return this.getNodesInternal().some(function (n, i) {
          return predicate.call(_this22, _this22.wrap(n), i);
        });
      }

      return someWhere;
    }()

    /**
     * Returns whether or not all of the nodes in the wrapper match the provided selector.
     *
     * @param {Function|String} selector
     * @returns {Boolean}
     */

  }, {
    key: 'every',
    value: function () {
      function every(selector) {
        var predicate = (0, _selectors.buildPredicate)(selector);
        return this.getNodesInternal().every(predicate);
      }

      return every;
    }()

    /**
     * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {Boolean}
     */

  }, {
    key: 'everyWhere',
    value: function () {
      function everyWhere(predicate) {
        var _this23 = this;

        return this.getNodesInternal().every(function (n, i) {
          return predicate.call(_this23, _this23.wrap(n), i);
        });
      }

      return everyWhere;
    }()

    /**
     * Utility method used to create new wrappers with a mapping function that returns an array of
     * nodes in response to a single node wrapper. The returned wrapper is a single wrapper around
     * all of the mapped nodes flattened (and de-duplicated).
     *
     * @param {Function} fn
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'flatMap',
    value: function () {
      function flatMap(fn) {
        var _this24 = this;

        var nodes = this.getNodesInternal().map(function (n, i) {
          return fn.call(_this24, _this24.wrap(n), i);
        });
        var flattened = (0, _arrayPrototype2['default'])(nodes, 1);
        return this.wrap(flattened.filter(Boolean));
      }

      return flatMap;
    }()

    /**
     * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
     * function. The predicate function will receive the nodes inside a ShallowWrapper as its
     * first argument.
     *
     * @param {Function} predicate
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'findWhere',
    value: function () {
      function findWhere(predicate) {
        var _this25 = this;

        return findWhereUnwrapped(this, function (n) {
          return predicate(_this25.wrap(n));
        });
      }

      return findWhere;
    }()

    /**
     * Returns the node at a given index of the current wrapper.
     *
     * @param index
     * @returns {ReactElement}
     */

  }, {
    key: 'get',
    value: function () {
      function get(index) {
        return this.getElements()[index];
      }

      return get;
    }()

    /**
     * Returns a wrapper around the node at a given index of the current wrapper.
     *
     * @param index
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'at',
    value: function () {
      function at(index) {
        var nodes = this.getNodesInternal();
        if (index < nodes.length) {
          return this.wrap(nodes[index]);
        }
        return this.wrap([]);
      }

      return at;
    }()

    /**
     * Returns a wrapper around the first node of the current wrapper.
     *
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'first',
    value: function () {
      function first() {
        return this.at(0);
      }

      return first;
    }()

    /**
     * Returns a wrapper around the last node of the current wrapper.
     *
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'last',
    value: function () {
      function last() {
        return this.at(this.length - 1);
      }

      return last;
    }()

    /**
     * Delegates to exists()
     *
     * @returns {boolean}
     */

  }, {
    key: 'isEmpty',
    value: function () {
      function isEmpty() {
        // eslint-disable-next-line no-console
        console.warn('Enzyme::Deprecated method isEmpty() called, use exists() instead.');
        return !this.exists();
      }

      return isEmpty;
    }()

    /**
     * Returns true if the current wrapper has nodes. False otherwise.
     * If called with a selector it returns `.find(selector).exists()` instead.
     *
     * @param {String|Function} selector (optional)
     * @returns {boolean}
     */

  }, {
    key: 'exists',
    value: function () {
      function exists() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (arguments.length > 0 && typeof selector !== 'string') {
          throw new TypeError('`selector` argument must be a string, if present.');
        }
        return typeof selector === 'string' ? this.find(selector).exists() : this.length > 0;
      }

      return exists;
    }()

    /**
     * Utility method that throws an error if the current instance has a length other than one.
     * This is primarily used to enforce that certain methods are only run on a wrapper when it is
     * wrapping a single node.
     *
     * @param fn
     * @returns {*}
     */

  }, {
    key: 'single',
    value: function () {
      function single(name, fn) {
        var fnName = typeof name === 'string' ? name : 'unknown';
        var callback = typeof fn === 'function' ? fn : name;
        if (this.length !== 1) {
          throw new Error('Method \u201C' + fnName + '\u201D is only meant to be run on a single node. ' + String(this.length) + ' found instead.');
        }
        return callback.call(this, this.getNodeInternal());
      }

      return single;
    }()

    /**
     * Helpful utility method to create a new wrapper with the same root as the current wrapper, with
     * any nodes passed in as the first parameter automatically wrapped.
     *
     * @param node
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'wrap',
    value: function () {
      function wrap(node) {
        var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[ROOT];

        if (node instanceof ShallowWrapper) {
          return node;
        }

        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        return new (Function.prototype.bind.apply(ShallowWrapper, [null].concat([node, root], args)))();
      }

      return wrap;
    }()

    /**
     * Returns an HTML-like string of the shallow render for debugging purposes.
     *
     * @param {Object} [options] - Property bag of additional options.
     * @param {boolean} [options.ignoreProps] - if true, props are omitted from the string.
     * @param {boolean} [options.verbose] - if true, arrays and objects to be verbosely printed.
     * @returns {String}
     */

  }, {
    key: 'debug',
    value: function () {
      function debug() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return (0, _Debug.debugNodes)(this.getNodesInternal(), options);
      }

      return debug;
    }()

    /**
     * Invokes intercepter and returns itself. intercepter is called with itself.
     * This is helpful when debugging nodes in method chains.
     * @param fn
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'tap',
    value: function () {
      function tap(intercepter) {
        intercepter(this);
        return this;
      }

      return tap;
    }()

    /**
     * Primarily useful for HOCs (higher-order components), this method may only be
     * run on a single, non-DOM node, and will return the node, shallow-rendered.
     *
     * @param {Object} options
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'dive',
    value: function () {
      function dive() {
        var _this26 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var adapter = (0, _getAdapter2['default'])(this[OPTIONS]);
        var name = 'dive';
        return this.single(name, function (n) {
          if (n && n.nodeType === 'host') {
            throw new TypeError('ShallowWrapper::' + name + '() can not be called on Host Components');
          }
          var el = (0, _getAdapter2['default'])(_this26[OPTIONS]).nodeToElement(n);
          if (!(0, _Utils.isCustomComponentElement)(el, adapter)) {
            throw new TypeError('ShallowWrapper::' + name + '() can only be called on components');
          }
          return _this26.wrap(el, null, (0, _object2['default'])({}, _this26[OPTIONS], options));
        });
      }

      return dive;
    }()

    /**
     * Strips out all the not host-nodes from the list of nodes
     *
     * This method is useful if you want to check for the presence of host nodes
     * (actually rendered HTML elements) ignoring the React nodes.
     */

  }, {
    key: 'hostNodes',
    value: function () {
      function hostNodes() {
        return this.filterWhere(function (n) {
          return typeof n.type() === 'string';
        });
      }

      return hostNodes;
    }()
  }]);

  return ShallowWrapper;
}();

if (_Utils.ITERATOR_SYMBOL) {
  Object.defineProperty(ShallowWrapper.prototype, _Utils.ITERATOR_SYMBOL, {
    configurable: true,
    value: function () {
      function iterator() {
        var _ref2;

        var iter = this.getNodesInternal()[_Utils.ITERATOR_SYMBOL]();
        var adapter = (0, _getAdapter2['default'])(this[OPTIONS]);
        return _ref2 = {}, _defineProperty(_ref2, _Utils.ITERATOR_SYMBOL, function () {
          return this;
        }), _defineProperty(_ref2, 'next', function () {
          function next() {
            var next = iter.next();
            if (next.done) {
              return { done: true };
            }
            return {
              done: false,
              value: adapter.nodeToElement(next.value)
            };
          }

          return next;
        }()), _ref2;
      }

      return iterator;
    }()
  });
}

function privateWarning(prop, extraMessage) {
  Object.defineProperty(ShallowWrapper.prototype, prop, {
    get: function () {
      function get() {
        throw new Error('\n        Attempted to access ShallowWrapper::' + String(prop) + ', which was previously a private property on\n        Enzyme ShallowWrapper instances, but is no longer and should not be relied upon.\n        ' + String(extraMessage) + '\n      ');
      }

      return get;
    }(),

    enumerable: false,
    configurable: false
  });
}

privateWarning('node', 'Consider using the getElement() method instead.');
privateWarning('nodes', 'Consider using the getElements() method instead.');
privateWarning('renderer', '');
privateWarning('options', '');
privateWarning('complexSelector', '');

exports['default'] = ShallowWrapper;