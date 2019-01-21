'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var loadableComponents = require('loadable-components');

var LOADABLE_STATE = '__LOADABLE_STATE__';
var LOADABLE = '@@loadable-components/loadable';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/* eslint-disable react/no-danger */

var DeferredState = function () {
  function DeferredState(tree) {
    classCallCheck(this, DeferredState);

    this.tree = tree;
  }

  DeferredState.prototype.getScriptContent = function getScriptContent() {
    return 'window.' + LOADABLE_STATE + ' = ' + JSON.stringify(this.tree) + ';';
  };

  DeferredState.prototype.getScriptTag = function getScriptTag() {
    return '<script>' + this.getScriptContent() + '</script>';
  };

  DeferredState.prototype.getScriptElement = function getScriptElement() {
    return React.createElement('script', { dangerouslySetInnerHTML: { __html: this.getScriptContent() } });
  };

  return DeferredState;
}();

/* eslint-disable react/no-danger, no-underscore-dangle */

function isReactElement(element) {
  return !!element.type;
}

function isComponentClass(Comp) {
  return Comp.prototype && (Comp.prototype.render || Comp.prototype.isReactComponent);
}

function providesChildContext(instance) {
  return !!instance.getChildContext;
}

// Recurse a React Element tree, running visitor on each element.
// If visitor returns `false`, don't call the element's render function
//   or recurse into its child elements
function walkTree(element, context, visitor) {
  if (Array.isArray(element)) {
    element.forEach(function (item) {
      return walkTree(item, context, visitor);
    });
    return;
  }

  if (!element) {
    return;
  }

  // a stateless functional component or a class
  if (isReactElement(element)) {
    if (typeof element.type === 'function') {
      var Comp = element.type;
      var props = Object.assign({}, Comp.defaultProps, element.props);
      var childContext = context;
      var child = void 0;

      // Are we are a react class?
      //   https://github.com/facebook/react/blob/master/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L66
      if (isComponentClass(Comp)) {
        var instance = new Comp(props, context);
        // In case the user doesn't pass these to super in the constructor
        instance.props = instance.props || props;
        instance.context = instance.context || context;
        // set the instance state to null (not undefined) if not set, to match React behaviour
        instance.state = instance.state || null;

        // Override setState to just change the state, not queue up an update.
        //   (we can't do the default React thing as we aren't mounted "properly"
        //   however, we don't need to re-render as well only support setState in
        //   componentWillMount, which happens *before* render).
        instance.setState = function (newState) {
          if (typeof newState === 'function') {
            // React's TS type definitions don't contain context as a third parameter for
            // setState's updater function.
            // Remove this cast to `any` when that is fixed.
            newState = newState(instance.state, instance.props, instance.context);
          }
          instance.state = Object.assign({}, instance.state, newState);
        };

        // this is a poor man's version of
        //   https://github.com/facebook/react/blob/master/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L181
        if (instance.componentWillMount) {
          instance.componentWillMount();
        }

        if (providesChildContext(instance)) {
          childContext = Object.assign({}, context, instance.getChildContext());
        }

        if (visitor(element, instance, context, childContext) === false) {
          return;
        }

        child = instance.render();
      } else {
        // just a stateless functional
        if (visitor(element, null, context) === false) {
          return;
        }

        child = Comp(props, context);
      }

      if (child) {
        if (Array.isArray(child)) {
          child.forEach(function (item) {
            return walkTree(item, childContext, visitor);
          });
        } else {
          walkTree(child, childContext, visitor);
        }
      }
    } else {
      // a basic string or dom element, just get children
      if (visitor(element, null, context) === false) {
        return;
      }

      // Context.Provider
      if (element.type && element.type._context) {
        element.type._context._currentValue = element.props.value;
      }

      // Context.Consumer
      if (element && element.type && element.type.Provider) {
        var _child = element.props.children(element.type._currentValue);
        if (_child) {
          walkTree(_child, context, visitor);
        }
      }

      if (element.props && element.props.children) {
        React.Children.forEach(element.props.children, function (child) {
          if (child) {
            walkTree(child, context, visitor);
          }
        });
      }
    }
  } else if (typeof element === 'string' || typeof element === 'number') {
    // Just visit these, they are leaves so we don't keep traversing.
    visitor(element, null, context);
  }
  // TODO: Portals?
}

function getQueriesFromTree(_ref) {
  var rootElement = _ref.rootElement,
      _ref$rootContext = _ref.rootContext,
      rootContext = _ref$rootContext === undefined ? {} : _ref$rootContext;
  var fetchRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var queries = [];

  walkTree(rootElement, rootContext, function (element, instance, context) {
    var skipRoot = !fetchRoot && element === rootElement;

    if (instance && instance.constructor[LOADABLE] && !skipRoot) {
      var loadable = instance.constructor[LOADABLE]();
      var query = loadable.load().then(function () {
        if (!loadable.componentId) {
          throw new Error('loadable-components: modules entry is missing, you are probably missing `loadable-components/babel` in your Babel config.');
        }
        return loadable.componentId;
      });

      if (query) {
        queries.push({ query: query, element: element, context: context });

        // Tell walkTree to not recurse inside this component;  we will
        // wait for the query to execute before attempting it.
        return false;
      }
    }

    return true;
  });

  return queries;
}

function getLoadableState(rootElement) {
  var rootContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fetchRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var tree = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Prevent duplicated components
  loadableComponents.componentTracker.reset();

  var queries = getQueriesFromTree({ rootElement: rootElement, rootContext: rootContext }, fetchRoot);

  // no queries found, nothing to do
  if (!queries.length) return Promise.resolve(new DeferredState(tree));

  var errors = [];
  tree.children = [];

  // wait on each query that we found, re-rendering the subtree when it's done
  var mappedQueries = queries.map(function (_ref2) {
    var query = _ref2.query,
        element = _ref2.element,
        context = _ref2.context;
    return (
      // we've just grabbed the query for element, so don't try and get it again
      query.then(function (id) {
        var subTree = { id: id };
        tree.children.push(subTree);
        return getLoadableState(element, context, false, subTree);
      }).catch(function (e) {
        return errors.push(e);
      })
    );
  });

  return Promise.all(mappedQueries).then(function () {
    if (errors.length > 0) {
      if (errors.length === 1) {
        throw errors[0];
      } else {
        var err = new Error(errors.length + ' errors were thrown when importing your modules.');
        err.queryErrors = errors;
        throw err;
      }
    }

    return new DeferredState(tree);
  });
}

exports.walkTree = walkTree;
exports.getLoadableState = getLoadableState;
//# sourceMappingURL=loadable-components.server.cjs.js.map
