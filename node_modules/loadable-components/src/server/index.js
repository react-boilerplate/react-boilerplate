/* eslint-disable react/no-danger, no-underscore-dangle */
import React from 'react'
// eslint-disable-next-line import/no-unresolved, import/extensions
import { componentTracker } from 'loadable-components'
import { LOADABLE } from '../constants'
import DeferredState from './DeferredState'

function isReactElement(element) {
  return !!element.type
}

function isComponentClass(Comp) {
  return (
    Comp.prototype && (Comp.prototype.render || Comp.prototype.isReactComponent)
  )
}

function providesChildContext(instance) {
  return !!instance.getChildContext
}

// Recurse a React Element tree, running visitor on each element.
// If visitor returns `false`, don't call the element's render function
//   or recurse into its child elements
export function walkTree(element, context, visitor) {
  if (Array.isArray(element)) {
    element.forEach(item => walkTree(item, context, visitor))
    return
  }

  if (!element) {
    return
  }

  // a stateless functional component or a class
  if (isReactElement(element)) {
    if (typeof element.type === 'function') {
      const Comp = element.type
      const props = Object.assign({}, Comp.defaultProps, element.props)
      let childContext = context
      let child

      // Are we are a react class?
      //   https://github.com/facebook/react/blob/master/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L66
      if (isComponentClass(Comp)) {
        const instance = new Comp(props, context)
        // In case the user doesn't pass these to super in the constructor
        instance.props = instance.props || props
        instance.context = instance.context || context
        // set the instance state to null (not undefined) if not set, to match React behaviour
        instance.state = instance.state || null

        // Override setState to just change the state, not queue up an update.
        //   (we can't do the default React thing as we aren't mounted "properly"
        //   however, we don't need to re-render as well only support setState in
        //   componentWillMount, which happens *before* render).
        instance.setState = newState => {
          if (typeof newState === 'function') {
            // React's TS type definitions don't contain context as a third parameter for
            // setState's updater function.
            // Remove this cast to `any` when that is fixed.
            newState = newState(
              instance.state,
              instance.props,
              instance.context,
            )
          }
          instance.state = Object.assign({}, instance.state, newState)
        }

        // this is a poor man's version of
        //   https://github.com/facebook/react/blob/master/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L181
        if (instance.componentWillMount) {
          instance.componentWillMount()
        }

        if (providesChildContext(instance)) {
          childContext = Object.assign({}, context, instance.getChildContext())
        }

        if (visitor(element, instance, context, childContext) === false) {
          return
        }

        child = instance.render()
      } else {
        // just a stateless functional
        if (visitor(element, null, context) === false) {
          return
        }

        child = Comp(props, context)
      }

      if (child) {
        if (Array.isArray(child)) {
          child.forEach(item => walkTree(item, childContext, visitor))
        } else {
          walkTree(child, childContext, visitor)
        }
      }
    } else {
      // a basic string or dom element, just get children
      if (visitor(element, null, context) === false) {
        return
      }

      // Context.Provider
      if (element.type && element.type._context) {
        element.type._context._currentValue = element.props.value
      }

      // Context.Consumer
      if (element && element.type && element.type.Provider) {
        const child = element.props.children(element.type._currentValue)
        if (child) {
          walkTree(child, context, visitor)
        }
      }

      if (element.props && element.props.children) {
        React.Children.forEach(element.props.children, (child: any) => {
          if (child) {
            walkTree(child, context, visitor)
          }
        })
      }
    }
  } else if (typeof element === 'string' || typeof element === 'number') {
    // Just visit these, they are leaves so we don't keep traversing.
    visitor(element, null, context)
  }
  // TODO: Portals?
}

function getQueriesFromTree(
  { rootElement, rootContext = {} },
  fetchRoot = true,
) {
  const queries = []

  walkTree(rootElement, rootContext, (element, instance, context) => {
    const skipRoot = !fetchRoot && element === rootElement

    if (instance && instance.constructor[LOADABLE] && !skipRoot) {
      const loadable = instance.constructor[LOADABLE]()
      const query = loadable.load().then(() => {
        if (!loadable.componentId) {
          throw new Error(
            'loadable-components: modules entry is missing, you are probably missing `loadable-components/babel` in your Babel config.',
          )
        }
        return loadable.componentId
      })

      if (query) {
        queries.push({ query, element, context })

        // Tell walkTree to not recurse inside this component;  we will
        // wait for the query to execute before attempting it.
        return false
      }
    }

    return true
  })

  return queries
}

export function getLoadableState(
  rootElement,
  rootContext = {},
  fetchRoot = true,
  tree = {},
) {
  // Prevent duplicated components
  componentTracker.reset()

  const queries = getQueriesFromTree({ rootElement, rootContext }, fetchRoot)

  // no queries found, nothing to do
  if (!queries.length) return Promise.resolve(new DeferredState(tree))

  const errors = []
  tree.children = []

  // wait on each query that we found, re-rendering the subtree when it's done
  const mappedQueries = queries.map(({ query, element, context }) =>
    // we've just grabbed the query for element, so don't try and get it again
    query
      .then(id => {
        const subTree = { id }
        tree.children.push(subTree)
        return getLoadableState(element, context, false, subTree)
      })
      .catch(e => errors.push(e)),
  )

  return Promise.all(mappedQueries).then(() => {
    if (errors.length > 0) {
      if (errors.length === 1) {
        throw errors[0]
      } else {
        const err = new Error(
          `${errors.length} errors were thrown when importing your modules.`,
        )
        err.queryErrors = errors
        throw err
      }
    }

    return new DeferredState(tree)
  })
}
