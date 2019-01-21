import _ from 'lodash'
import { Children, isValidElement } from 'react'

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {object} children Element's children
 * @return {object} Mapping of key to child
 */
export const getChildMapping = children => _.keyBy(_.filter(Children.toArray(children), isValidElement), 'key')

const getPendingKeys = (prev, next) => {
  const nextKeysPending = {}
  let pendingKeys = []

  _.forEach(_.keys(prev), (prevKey) => {
    if (!_.has(next, prevKey)) {
      pendingKeys.push(prevKey)
      return
    }

    if (pendingKeys.length) {
      nextKeysPending[prevKey] = pendingKeys
      pendingKeys = []
    }
  })

  return [nextKeysPending, pendingKeys]
}

const getValue = (key, prev, next) => (_.has(next, key) ? next[key] : prev[key])

/**
 * When you're adding or removing children some may be added or removed in the same render pass. We want to show *both*
 * since we want to simultaneously animate elements in and out. This function takes a previous set of keys and a new set
 * of keys and merges them with its best guess of the correct ordering.
 *
 * @param {object} prev Prev children as returned from `getChildMapping()`
 * @param {object} next Next children as returned from `getChildMapping()`
 * @return {object} A key set that contains all keys in `prev` and all keys in `next` in a reasonable order
 */
export const mergeChildMappings = (prev = {}, next = {}) => {
  const childMapping = {}
  const [nextKeysPending, pendingKeys] = getPendingKeys(prev, next)

  _.forEach(_.keys(next), (nextKey) => {
    if (_.has(nextKeysPending, nextKey)) {
      _.forEach(nextKeysPending[nextKey], (pendingKey) => {
        childMapping[pendingKey] = getValue(pendingKey, prev, next)
      })
    }

    childMapping[nextKey] = getValue(nextKey, prev, next)
  })

  _.forEach(pendingKeys, (pendingKey) => {
    childMapping[pendingKey] = getValue(pendingKey, prev, next)
  })

  return childMapping
}
