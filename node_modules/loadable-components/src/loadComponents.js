/* eslint-env browser */
import { LOADABLE, LOADABLE_STATE } from './constants'
import * as componentTracker from './componentTracker'

function loadState(rootState) {
  if (!rootState.children) return Promise.resolve(null)

  return Promise.all(
    rootState.children.map(state => {
      const component = componentTracker.get(state.id)

      if (!component) {
        // eslint-disable-next-line
        console.warn(
          'loadable-component client modules:',
          componentTracker.getAll(),
        )
        // eslint-disable-next-line
        console.warn(
          'loadable-component server modules:',
          window[LOADABLE_STATE],
        )

        return Promise.reject(
          new Error(
            `loadable-components: module "${
              state.id
            }" is not found, client and server modules are not sync. You are probably not using the same resolver on server and client.`,
          ),
        )
      }

      const getLoadable = component[LOADABLE]

      if (typeof getLoadable !== 'function') {
        return Promise.reject(
          new Error(
            `loadable-components: module "${
              state.id
            }" is not a loadable component, please verify your SSR setup`,
          ),
        )
      }

      return getLoadable()
        .load()
        .then(() => loadState(state))
    }),
  )
}

function loadComponents() {
  if (typeof window === 'undefined') {
    return Promise.reject(
      new Error(
        'loadable-components: `loadComponents` must ' +
          'be called client-side: `window` is undefined',
      ),
    )
  }

  const state = window[LOADABLE_STATE]
  if (!state) {
    return Promise.reject(
      new Error(
        'loadable-components state not found. ' +
          'You have a problem server-side. ' +
          'Please verify that you have called `loadableState.getScriptTag()` server-side.',
      ),
    )
  }

  return loadState(state)
}

export default loadComponents
