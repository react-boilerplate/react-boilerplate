import flatten from 'lodash/flatten';
import unique from 'lodash/uniq';
import compact from 'lodash/compact';
import cheerio from 'cheerio';

import {
  nodeEqual,
  nodeMatches,
  containsChildrenSubArray,
  withSetStateAllowed,
  typeOfNode,
  isReactElementAlike,
  displayNameOfNode,
  isCustomComponentElement,
  ITERATOR_SYMBOL,
  getAdapter,
  makeOptions,
  sym,
  privateSet,
  cloneElement,
} from './Utils';
import {
  debugNodes,
} from './Debug';
import {
  propsOfNode,
  getTextFromNode,
  hasClassName,
  childrenOfNode,
  parentsOfNode,
  treeFilter,
} from './RSTTraversal';
import { buildPredicate, reduceTreesBySelector } from './selectors';

const NODE = sym('__node__');
const NODES = sym('__nodes__');
const RENDERER = sym('__renderer__');
const UNRENDERED = sym('__unrendered__');
const ROOT = sym('__root__');
const OPTIONS = sym('__options__');
/**
 * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
 * function.
 *
 * @param {ShallowWrapper} wrapper
 * @param {Function} predicate
 * @param {Function} filter
 * @returns {ShallowWrapper}
 */
function findWhereUnwrapped(wrapper, predicate, filter = treeFilter) {
  return wrapper.flatMap(n => filter(n.getNodeInternal(), predicate));
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
  return wrapper.wrap(compact(wrapper.getNodesInternal().filter(predicate)));
}

/**
 * Ensure options passed to ShallowWrapper are valid. Throws otherwise.
 * @param {Object} options
 */
function validateOptions(options) {
  const { lifecycleExperimental, disableLifecycleMethods } = options;
  if (
    typeof lifecycleExperimental !== 'undefined' &&
    typeof lifecycleExperimental !== 'boolean'
  ) {
    throw new Error('lifecycleExperimental must be either true or false if provided');
  }

  if (
    typeof disableLifecycleMethods !== 'undefined' &&
    typeof disableLifecycleMethods !== 'boolean'
  ) {
    throw new Error('disableLifecycleMethods must be either true or false if provided');
  }

  if (
    lifecycleExperimental != null &&
    disableLifecycleMethods != null &&
    lifecycleExperimental === disableLifecycleMethods
  ) {
    throw new Error('lifecycleExperimental and disableLifecycleMethods cannot be set to the same value');
  }
}

function getRootNode(node) {
  if (node.nodeType === 'host') {
    return node;
  }
  return node.rendered;
}

/**
 * @class ShallowWrapper
 */
class ShallowWrapper {
  constructor(nodes, root, passedOptions = {}) {
    validateOptions(passedOptions);
    const options = makeOptions(passedOptions);
    if (!root) {
      privateSet(this, ROOT, this);
      privateSet(this, UNRENDERED, nodes);
      const renderer = getAdapter(options).createRenderer({ mode: 'shallow', ...options });
      privateSet(this, RENDERER, renderer);
      this[RENDERER].render(nodes, options.context);
      const { instance } = this[RENDERER].getNode();
      if (
        !options.disableLifecycleMethods &&
        instance &&
        typeof instance.componentDidMount === 'function'
      ) {
        this[RENDERER].batchedUpdates(() => {
          instance.componentDidMount();
        });
      }
      privateSet(this, NODE, getRootNode(this[RENDERER].getNode()));
      privateSet(this, NODES, [this[NODE]]);
      this.length = 1;
    } else {
      privateSet(this, ROOT, root);
      privateSet(this, UNRENDERED, null);
      privateSet(this, RENDERER, root[RENDERER]);
      if (!Array.isArray(nodes)) {
        privateSet(this, NODE, nodes);
        privateSet(this, NODES, [nodes]);
      } else {
        privateSet(this, NODE, nodes[0]);
        privateSet(this, NODES, nodes);
      }
      this.length = this[NODES].length;
    }
    privateSet(this, OPTIONS, root ? root[OPTIONS] : options);
  }


  /**
   * Returns the root wrapper
   *
   * @return {ShallowWrapper}
   */
  root() {
    return this[ROOT];
  }


  getNodeInternal() {
    if (this.length !== 1) {
      throw new Error('ShallowWrapper::getNode() can only be called when wrapping one node');
    }
    return this[NODE];
  }

  /**
   * Returns the wrapped ReactElement.
   *
   * @return {ReactElement}
   */
  getElement() {
    if (this.length !== 1) {
      throw new Error('ShallowWrapper::getElement() can only be called when wrapping one node');
    }
    return getAdapter(this[OPTIONS]).nodeToElement(this[NODE]);
  }

  /**
   * Returns the wrapped ReactElements.
   *
   * @return {Array<ReactElement>}
   */
  getElements() {
    return this[NODES].map(getAdapter(this[OPTIONS]).nodeToElement);
  }

  // eslint-disable-next-line class-methods-use-this
  getNode() {
    throw new Error('ShallowWrapper::getNode() is no longer supported. Use ShallowWrapper::getElement() instead');
  }

  getNodesInternal() {
    return this[NODES];
  }

  // eslint-disable-next-line class-methods-use-this
  getNodes() {
    throw new Error('ShallowWrapper::getNodes() is no longer supported. Use ShallowWrapper::getElements() instead');
  }

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
  instance() {
    if (this[ROOT] !== this) {
      throw new Error('ShallowWrapper::instance() can only be called on the root');
    }
    return this[RENDERER].getNode().instance;
  }

  /**
   * Forces a re-render. Useful to run before checking the render output if something external
   * may be updating the state of the component somewhere.
   *
   * NOTE: can only be called on a wrapper instance that is also the root instance.
   *
   * @returns {ShallowWrapper}
   */
  update() {
    if (this[ROOT] !== this) {
      throw new Error('ShallowWrapper::update() can only be called on the root');
    }
    this.single('update', () => {
      this[NODE] = getRootNode(this[RENDERER].getNode());
      this[NODES] = [this[NODE]];
    });
    return this;
  }

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
  rerender(props, context) {
    const adapter = getAdapter(this[OPTIONS]);
    this.single('rerender', () => {
      withSetStateAllowed(() => {
        // NOTE(lmr): In react 16, instances will be null for SFCs, but
        // rerendering with props/context is still a valid thing to do. In
        // this case, state will be undefined, but props/context will exist.
        const instance = this.instance() || {};
        const { state } = instance;
        const prevProps = instance.props || this[UNRENDERED].props;
        const prevContext = instance.context || this[OPTIONS].context;
        const nextProps = { ...prevProps, ...props };
        const nextContext = context || prevContext;
        if (context) {
          this[OPTIONS] = { ...this[OPTIONS], context: nextContext };
        }
        this[RENDERER].batchedUpdates(() => {
          let shouldRender = true;
          // dirty hack:
          // make sure that componentWillReceiveProps is called before shouldComponentUpdate
          let originalComponentWillReceiveProps;
          if (
            !this[OPTIONS].disableLifecycleMethods &&
            instance &&
            typeof instance.componentWillReceiveProps === 'function'
          ) {
            instance.componentWillReceiveProps(nextProps, nextContext);
            originalComponentWillReceiveProps = instance.componentWillReceiveProps;
            instance.componentWillReceiveProps = () => {};
          }
          // dirty hack: avoid calling shouldComponentUpdate twice
          let originalShouldComponentUpdate;
          if (
            !this[OPTIONS].disableLifecycleMethods &&
            instance &&
            typeof instance.shouldComponentUpdate === 'function'
          ) {
            shouldRender = instance.shouldComponentUpdate(nextProps, state, nextContext);
            originalShouldComponentUpdate = instance.shouldComponentUpdate;
          }
          if (shouldRender) {
            if (props) this[UNRENDERED] = cloneElement(adapter, this[UNRENDERED], props);
            if (originalShouldComponentUpdate) {
              instance.shouldComponentUpdate = () => true;
            }

            this[RENDERER].render(this[UNRENDERED], nextContext);

            if (originalShouldComponentUpdate) {
              instance.shouldComponentUpdate = originalShouldComponentUpdate;
            }
            if (
              !this[OPTIONS].disableLifecycleMethods &&
              instance &&
              typeof instance.componentDidUpdate === 'function'
            ) {
              if (adapter.options.supportPrevContextArgumentOfComponentDidUpdate) {
                instance.componentDidUpdate(prevProps, state, prevContext);
              } else {
                instance.componentDidUpdate(prevProps, state);
              }
            }
            this.update();
          // If it doesn't need to rerender, update only its props.
          } else if (props) {
            instance.props = props;
          }
          if (originalComponentWillReceiveProps) {
            instance.componentWillReceiveProps = originalComponentWillReceiveProps;
          }
        });
      });
    });
    return this;
  }

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
   * @returns {ShallowWrapper}
   */
  setProps(props) {
    if (this[ROOT] !== this) {
      throw new Error('ShallowWrapper::setProps() can only be called on the root');
    }
    return this.rerender(props);
  }

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
  setState(state, callback = undefined) {
    if (this[ROOT] !== this) {
      throw new Error('ShallowWrapper::setState() can only be called on the root');
    }
    if (this.instance() === null || this[RENDERER].getNode().nodeType === 'function') {
      throw new Error('ShallowWrapper::setState() can only be called on class components');
    }
    this.single('setState', () => {
      withSetStateAllowed(() => {
        const adapter = getAdapter(this[OPTIONS]);
        const instance = this.instance();
        const prevProps = instance.props;
        const prevState = instance.state;
        const prevContext = instance.context;
        let shouldRender = true;
        // This is a dirty hack but it requires to know the result of shouldComponentUpdate.
        // When shouldComponentUpdate returns false we shouldn't call componentDidUpdate.
        // shouldComponentUpdate is called in `instance.setState`
        // so we replace shouldComponentUpdate to know the result and restore it later.
        let originalShouldComponentUpdate;
        if (
          !this[OPTIONS].disableLifecycleMethods &&
          adapter.options.enableComponentDidUpdateOnSetState &&
          instance &&
          typeof instance.shouldComponentUpdate === 'function'
        ) {
          originalShouldComponentUpdate = instance.shouldComponentUpdate;
          instance.shouldComponentUpdate = (...args) => {
            shouldRender = originalShouldComponentUpdate.apply(instance, args);
            instance.shouldComponentUpdate = originalShouldComponentUpdate;
            return shouldRender;
          };
        }
        instance.setState(state, callback);
        if (
          shouldRender &&
          !this[OPTIONS].disableLifecycleMethods &&
          adapter.options.enableComponentDidUpdateOnSetState &&
          instance &&
          typeof instance.componentDidUpdate === 'function'
        ) {
          if (adapter.options.supportPrevContextArgumentOfComponentDidUpdate) {
            instance.componentDidUpdate(prevProps, prevState, prevContext);
          } else {
            instance.componentDidUpdate(prevProps, prevState);
          }
        }
        this.update();
      });
    });
    return this;
  }

  /**
   * A method that sets the context of the root component, and re-renders. Useful for when you are
   * wanting to test how the component behaves over time with changing contexts.
   *
   * NOTE: can only be called on a wrapper instance that is also the root instance.
   *
   * @param {Object} context object
   * @returns {ShallowWrapper}
   */
  setContext(context) {
    if (this[ROOT] !== this) {
      throw new Error('ShallowWrapper::setContext() can only be called on the root');
    }
    if (!this[OPTIONS].context) {
      throw new Error('ShallowWrapper::setContext() can only be called on a wrapper that was originally passed a context option');
    }
    return this.rerender(null, context);
  }

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
  contains(nodeOrNodes) {
    const adapter = getAdapter(this[OPTIONS]);
    if (!isReactElementAlike(nodeOrNodes, adapter)) {
      throw new Error('ShallowWrapper::contains() can only be called with ReactElement (or array of them), string or number as argument.');
    }
    const predicate = Array.isArray(nodeOrNodes)
      ? other => containsChildrenSubArray(
        nodeEqual,
        other,
        nodeOrNodes.map(adapter.elementToNode),
      )
      : other => nodeEqual(adapter.elementToNode(nodeOrNodes), other);

    return findWhereUnwrapped(this, predicate).length > 0;
  }

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
  containsMatchingElement(node) {
    const predicate = other => nodeMatches(node, other, (a, b) => a <= b);
    return findWhereUnwrapped(this, predicate).length > 0;
  }

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
  containsAllMatchingElements(nodes) {
    if (!Array.isArray(nodes)) {
      throw new TypeError('nodes should be an Array');
    }

    return nodes.every(node => this.containsMatchingElement(node));
  }

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
  containsAnyMatchingElements(nodes) {
    return Array.isArray(nodes) && nodes.some(node => this.containsMatchingElement(node));
  }

  /**
   * Whether or not a given react element exists in the shallow render tree.
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
  equals(node) {
    return this.single('equals', () => nodeEqual(this.getNodeInternal(), node));
  }

  /**
   * Whether or not a given react element matches the shallow render tree.
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
  matchesElement(node) {
    return this.single('matchesElement', () => nodeMatches(node, this.getNodeInternal(), (a, b) => a <= b));
  }

  /**
   * Finds every node in the render tree of the current wrapper that matches the provided selector.
   *
   * @param {String|Function} selector
   * @returns {ShallowWrapper}
   */
  find(selector) {
    return this.wrap(reduceTreesBySelector(selector, this.getNodesInternal()));
  }

  /**
   * Returns whether or not current node matches a provided selector.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @param {String|Function} selector
   * @returns {boolean}
   */
  is(selector) {
    const predicate = buildPredicate(selector);
    return this.single('is', n => predicate(n));
  }

  /**
   * Returns true if the component rendered nothing, i.e., null or false.
   *
   * @returns {boolean}
   */
  isEmptyRender() {
    return this.type() === null;
  }

  /**
   * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
   * the provided predicate function. The predicate should receive a wrapped node as its first
   * argument.
   *
   * @param {Function} predicate
   * @returns {ShallowWrapper}
   */
  filterWhere(predicate) {
    return filterWhereUnwrapped(this, n => predicate(this.wrap(n)));
  }

  /**
   * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
   * the provided selector.
   *
   * @param {String|Function} selector
   * @returns {ShallowWrapper}
   */
  filter(selector) {
    const predicate = buildPredicate(selector);
    return filterWhereUnwrapped(this, predicate);
  }

  /**
   * Returns a new wrapper instance with only the nodes of the current wrapper that did not match
   * the provided selector. Essentially the inverse of `filter`.
   *
   * @param {String|Function} selector
   * @returns {ShallowWrapper}
   */
  not(selector) {
    const predicate = buildPredicate(selector);
    return filterWhereUnwrapped(this, n => !predicate(n));
  }

  /**
   * Returns a string of the rendered text of the current render tree.  This function should be
   * looked at with skepticism if being used to test what the actual HTML output of the component
   * will be. If that is what you would like to test, use enzyme's `render` function instead.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @returns {String}
   */
  text() {
    return this.single('text', getTextFromNode);
  }

  /**
   * Returns the HTML of the node.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @returns {String}
   */
  html() {
    return this.single('html', (n) => {
      if (this.type() === null) return null;
      const adapter = getAdapter(this[OPTIONS]);
      const renderer = adapter.createRenderer({ ...this[OPTIONS], mode: 'string' });
      return renderer.render(adapter.nodeToElement(n));
    });
  }

  /**
   * Returns the current node rendered to HTML and wrapped in a CheerioWrapper.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @returns {CheerioWrapper}
   */
  render() {
    return this.type() === null ? cheerio() : cheerio.load('')(this.html());
  }

  /**
   * A method that unmounts the component. This can be used to simulate a component going through
   * and unmount/mount lifecycle.
   * @returns {ShallowWrapper}
   */
  unmount() {
    this[RENDERER].unmount();
    return this;
  }

  /**
   * Used to simulate events. Pass an eventname and (optionally) event arguments. This method of
   * testing events should be met with some skepticism.
   *
   * @param {String} event
   * @param {Array} args
   * @returns {ShallowWrapper}
   */
  simulate(event, ...args) {
    return this.single('simulate', (n) => {
      this[RENDERER].simulateEvent(n, event, ...args);
      this[ROOT].update();
    });
  }

  /**
   * Returns the props hash for the current node of the wrapper.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @returns {Object}
   */
  props() {
    return this.single('props', propsOfNode);
  }

  /**
   * Returns the state hash for the root node of the wrapper. Optionally pass in a prop name and it
   * will return just that value.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @param {String} name (optional)
   * @returns {*}
   */
  state(name) {
    if (this[ROOT] !== this) {
      throw new Error('ShallowWrapper::state() can only be called on the root');
    }
    if (this.instance() === null || this[RENDERER].getNode().nodeType === 'function') {
      throw new Error('ShallowWrapper::state() can only be called on class components');
    }
    const _state = this.single('state', () => this.instance().state);
    if (typeof name !== 'undefined') {
      return _state[name];
    }
    return _state;
  }

  /**
   * Returns the context hash for the root node of the wrapper.
   * Optionally pass in a prop name and it will return just that value.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @param {String} name (optional)
   * @returns {*}
   */
  context(name) {
    if (this[ROOT] !== this) {
      throw new Error('ShallowWrapper::context() can only be called on the root');
    }
    if (!this[OPTIONS].context) {
      throw new Error('ShallowWrapper::context() can only be called on a wrapper that was originally passed a context option');
    }
    if (this.instance() === null) {
      throw new Error('ShallowWrapper::context() can only be called on wrapped nodes that have a non-null instance');
    }
    const _context = this.single('context', () => this.instance().context);
    if (name) {
      return _context[name];
    }
    return _context;
  }

  /**
   * Returns a new wrapper with all of the children of the current wrapper.
   *
   * @param {String|Function} [selector]
   * @returns {ShallowWrapper}
   */
  children(selector) {
    const allChildren = this.flatMap(n => childrenOfNode(n.getNodeInternal()));
    return selector ? allChildren.filter(selector) : allChildren;
  }

  /**
   * Returns a new wrapper with a specific child
   *
   * @param {Number} [index]
   * @returns {ShallowWrapper}
   */
  childAt(index) {
    return this.single('childAt', () => this.children().at(index));
  }

  /**
   * Returns a wrapper around all of the parents/ancestors of the wrapper. Does not include the node
   * in the current wrapper.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @param {String|Function} [selector]
   * @returns {ShallowWrapper}
   */
  parents(selector) {
    const allParents = this.wrap(this.single('parents', n => parentsOfNode(n, this[ROOT][NODE])));
    return selector ? allParents.filter(selector) : allParents;
  }

  /**
   * Returns a wrapper around the immediate parent of the current node.
   *
   * @returns {ShallowWrapper}
   */
  parent() {
    return this.flatMap(n => [n.parents().get(0)]);
  }

  /**
   *
   * @param {String|Function} selector
   * @returns {ShallowWrapper}
   */
  closest(selector) {
    return this.is(selector) ? this : this.parents().filter(selector).first();
  }

  /**
   * Shallow renders the current node and returns a shallow wrapper around it.
   *
   * NOTE: can only be called on wrapper of a single node.
   *
   * @param {Object} options
   * @returns {ShallowWrapper}
   */
  shallow(options) {
    return this.single('shallow', n => (
      this.wrap(getAdapter(this[OPTIONS]).nodeToElement(n), null, options)
    ));
  }

  /**
   * Returns the value of prop with the given name of the current node.
   *
   * @param propName
   * @returns {*}
   */
  prop(propName) {
    return this.props()[propName];
  }

  /**
   * Returns the key assigned to the current node.
   *
   * @returns {String}
   */
  key() {
    return this.single('key', n => n.key);
  }

  /**
   * Returns the type of the current node of this wrapper. If it's a composite component, this will
   * be the component constructor. If it's a native DOM node, it will be a string.
   *
   * @returns {String|Function}
   */
  type() {
    return this.single('type', typeOfNode);
  }

  /**
   * Returns the name of the current node of this wrapper.
   *
   * In order of precedence => type.displayName -> type.name -> type.
   *
   * @returns {String}
   */
  name() {
    return this.single('name', displayNameOfNode);
  }

  /**
   * Returns whether or not the current node has the given class name or not.
   *
   * NOTE: can only be called on a wrapper of a single node.
   *
   * @param className
   * @returns {Boolean}
   */
  hasClass(className) {
    if (className && className.indexOf('.') !== -1) {
      // eslint-disable-next-line no-console
      console.warn('It looks like you\'re calling `ShallowWrapper::hasClass()` with a CSS selector. hasClass() expects a class name, not a CSS selector.');
    }
    return this.single('hasClass', n => hasClassName(n, className));
  }

  /**
   * Iterates through each node of the current wrapper and executes the provided function with a
   * wrapper around the corresponding node passed in as the first argument.
   *
   * @param {Function} fn
   * @returns {ShallowWrapper}
   */
  forEach(fn) {
    this.getNodesInternal().forEach((n, i) => fn.call(this, this.wrap(n), i));
    return this;
  }

  /**
   * Maps the current array of nodes to another array. Each node is passed in as a `ShallowWrapper`
   * to the map function.
   *
   * @param {Function} fn
   * @returns {Array}
   */
  map(fn) {
    return this.getNodesInternal().map((n, i) => fn.call(this, this.wrap(n), i));
  }

  /**
   * Reduces the current array of nodes to a value. Each node is passed in as a `ShallowWrapper`
   * to the reducer function.
   *
   * @param {Function} fn - the reducer function
   * @param {*} initialValue - the initial value
   * @returns {*}
   */
  reduce(fn, initialValue = undefined) {
    if (arguments.length > 1) {
      return this.getNodesInternal().reduce(
        (accum, n, i) => fn.call(this, accum, this.wrap(n), i),
        initialValue,
      );
    }
    return this.getNodesInternal().reduce((accum, n, i) => fn.call(
      this,
      i === 1 ? this.wrap(accum) : accum,
      this.wrap(n),
      i,
    ));
  }

  /**
   * Reduces the current array of nodes to another array, from right to left. Each node is passed
   * in as a `ShallowWrapper` to the reducer function.
   *
   * @param {Function} fn - the reducer function
   * @param {*} initialValue - the initial value
   * @returns {*}
   */
  reduceRight(fn, initialValue = undefined) {
    if (arguments.length > 1) {
      return this.getNodesInternal().reduceRight(
        (accum, n, i) => fn.call(this, accum, this.wrap(n), i),
        initialValue,
      );
    }
    return this.getNodesInternal().reduceRight((accum, n, i) => fn.call(
      this,
      i === 1 ? this.wrap(accum) : accum,
      this.wrap(n),
      i,
    ));
  }

  /**
   * Returns a new wrapper with a subset of the nodes of the original wrapper, according to the
   * rules of `Array#slice`.
   *
   * @param {Number} begin
   * @param {Number} end
   * @returns {ShallowWrapper}
   */
  slice(begin, end) {
    return this.wrap(this.getNodesInternal().slice(begin, end));
  }

  /**
   * Returns whether or not any of the nodes in the wrapper match the provided selector.
   *
   * @param {Function|String} selector
   * @returns {Boolean}
   */
  some(selector) {
    if (this[ROOT] === this) {
      throw new Error('ShallowWrapper::some() can not be called on the root');
    }
    const predicate = buildPredicate(selector);
    return this.getNodesInternal().some(predicate);
  }

  /**
   * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
   *
   * @param {Function} predicate
   * @returns {Boolean}
   */
  someWhere(predicate) {
    return this.getNodesInternal().some((n, i) => predicate.call(this, this.wrap(n), i));
  }

  /**
   * Returns whether or not all of the nodes in the wrapper match the provided selector.
   *
   * @param {Function|String} selector
   * @returns {Boolean}
   */
  every(selector) {
    const predicate = buildPredicate(selector);
    return this.getNodesInternal().every(predicate);
  }

  /**
   * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
   *
   * @param {Function} predicate
   * @returns {Boolean}
   */
  everyWhere(predicate) {
    return this.getNodesInternal().every((n, i) => predicate.call(this, this.wrap(n), i));
  }

  /**
   * Utility method used to create new wrappers with a mapping function that returns an array of
   * nodes in response to a single node wrapper. The returned wrapper is a single wrapper around
   * all of the mapped nodes flattened (and de-duplicated).
   *
   * @param {Function} fn
   * @returns {ShallowWrapper}
   */
  flatMap(fn) {
    const nodes = this.getNodesInternal().map((n, i) => fn.call(this, this.wrap(n), i));
    const flattened = flatten(nodes, true);
    const uniques = unique(flattened);
    const compacted = compact(uniques);
    return this.wrap(compacted);
  }

  /**
   * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
   * function. The predicate function will receive the nodes inside a ShallowWrapper as its
   * first argument.
   *
   * @param {Function} predicate
   * @returns {ShallowWrapper}
   */
  findWhere(predicate) {
    return findWhereUnwrapped(this, n => predicate(this.wrap(n)));
  }

  /**
   * Returns the node at a given index of the current wrapper.
   *
   * @param index
   * @returns {ReactElement}
   */
  get(index) {
    return getAdapter(this[OPTIONS]).nodeToElement(this.getNodesInternal()[index]);
  }

  /**
   * Returns a wrapper around the node at a given index of the current wrapper.
   *
   * @param index
   * @returns {ShallowWrapper}
   */
  at(index) {
    return this.wrap(this.getNodesInternal()[index]);
  }

  /**
   * Returns a wrapper around the first node of the current wrapper.
   *
   * @returns {ShallowWrapper}
   */
  first() {
    return this.at(0);
  }

  /**
   * Returns a wrapper around the last node of the current wrapper.
   *
   * @returns {ShallowWrapper}
   */
  last() {
    return this.at(this.length - 1);
  }

  /**
   * Delegates to exists()
   *
   * @returns {boolean}
   */
  isEmpty() {
    // eslint-disable-next-line no-console
    console.warn('Enzyme::Deprecated method isEmpty() called, use exists() instead.');
    return !this.exists();
  }

  /**
   * Returns true if the current wrapper has nodes. False otherwise.
   *
   * @returns {boolean}
   */
  exists() {
    return this.length > 0;
  }

  /**
   * Utility method that throws an error if the current instance has a length other than one.
   * This is primarily used to enforce that certain methods are only run on a wrapper when it is
   * wrapping a single node.
   *
   * @param fn
   * @returns {*}
   */
  single(name, fn) {
    const fnName = typeof name === 'string' ? name : 'unknown';
    const callback = typeof fn === 'function' ? fn : name;
    if (this.length !== 1) {
      throw new Error(`Method “${fnName}” is only meant to be run on a single node. ${this.length} found instead.`);
    }
    return callback.call(this, this.getNodeInternal());
  }

  /**
   * Helpful utility method to create a new wrapper with the same root as the current wrapper, with
   * any nodes passed in as the first parameter automatically wrapped.
   *
   * @param node
   * @returns {ShallowWrapper}
   */
  wrap(node, root = this[ROOT], ...args) {
    if (node instanceof ShallowWrapper) {
      return node;
    }
    return new ShallowWrapper(node, root, ...args);
  }

  /**
   * Returns an HTML-like string of the shallow render for debugging purposes.
   *
   * @param {Object} options - (Optional) Property bag of additional options.
   * options.ignoreProps - if true, props are omitted from the string.
   * @returns {String}
   */
  debug(options = {}) {
    return debugNodes(this.getNodesInternal(), options);
  }

  /**
   * Invokes intercepter and returns itself. intercepter is called with itself.
   * This is helpful when debugging nodes in method chains.
   * @param fn
   * @returns {ShallowWrapper}
   */
  tap(intercepter) {
    intercepter(this);
    return this;
  }

  /**
   * Primarily useful for HOCs (higher-order components), this method may only be
   * run on a single, non-DOM node, and will return the node, shallow-rendered.
   *
   * @param {Object} options
   * @returns {ShallowWrapper}
   */
  dive(options = {}) {
    const adapter = getAdapter(this[OPTIONS]);
    const name = 'dive';
    return this.single(name, (n) => {
      if (n && n.nodeType === 'host') {
        throw new TypeError(`ShallowWrapper::${name}() can not be called on Host Components`);
      }
      const el = getAdapter(this[OPTIONS]).nodeToElement(n);
      if (!isCustomComponentElement(el, adapter)) {
        throw new TypeError(`ShallowWrapper::${name}() can only be called on components`);
      }
      return this.wrap(el, null, { ...this[OPTIONS], ...options });
    });
  }

  /**
   * Strips out all the not host-nodes from the list of nodes
   *
   * This method is useful if you want to check for the presence of host nodes
   * (actually rendered HTML elements) ignoring the React nodes.
   */
  hostNodes() {
    return this.filterWhere(n => typeof n.type() === 'string');
  }
}

if (ITERATOR_SYMBOL) {
  Object.defineProperty(ShallowWrapper.prototype, ITERATOR_SYMBOL, {
    configurable: true,
    value: function iterator() {
      const iter = this[NODES][ITERATOR_SYMBOL]();
      const adapter = getAdapter(this[OPTIONS]);
      return {
        next() {
          const next = iter.next();
          if (next.done) {
            return { done: true };
          }
          return {
            done: false,
            value: adapter.nodeToElement(next.value),
          };
        },
      };
    },
  });
}

function privateWarning(prop, extraMessage) {
  Object.defineProperty(ShallowWrapper.prototype, prop, {
    get() {
      throw new Error(`
        Attempted to access ShallowWrapper::${prop}, which was previously a private property on
        Enzyme ShallowWrapper instances, but is no longer and should not be relied upon.
        ${extraMessage}
      `);
    },
    enumerable: false,
    configurable: false,
  });
}

privateWarning('node', 'Consider using the getElement() method instead.');
privateWarning('nodes', 'Consider using the getElements() method instead.');
privateWarning('renderer', '');
privateWarning('options', '');
privateWarning('complexSelector', '');

export default ShallowWrapper;
