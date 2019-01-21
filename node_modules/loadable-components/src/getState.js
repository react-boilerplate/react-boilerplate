/* eslint-env browser */
/* eslint-disable import/prefer-default-export */
import { getAll as getAllComponents } from './componentTracker'
import { LOADABLE_STATE } from './constants'

function getState() {
  const componentByIds = getAllComponents()
  const children = Object.keys(componentByIds).reduce((ids, id) => {
    const component = componentByIds[id]
    if (component.loadingPromise) return [...ids, { id: component.componentId }]
    return ids
  }, [])
  return { [LOADABLE_STATE]: { children } }
}

export default getState
