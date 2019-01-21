import Immutable from 'seamless-immutable';
import {
  assertReducerShape,
  getUndefinedStateError,
  getNoValidReducersError,
  getNotSupportedTypeAsReducerError,
  getPossibleUnexpectedStateShapeWarning
} from './utils/combineReducersValidation'

export default function combineReducers(reducers) {
  // Validate reducers.
  const validReducers = Object.keys(reducers).reduce((accum, key) => {
    // A reducer must be a function.
    if (typeof reducers[key] !== 'function') {
      if (process.env.NODE_ENV !== 'production') {
        const errorMessage = getNotSupportedTypeAsReducerError(reducers, key)
        throw new Error(errorMessage)
      }
      return accum
    }

    return accum.set(key, reducers[key])
  }, Immutable({}))

  const validReducerKeys = Object.keys(validReducers)

  if (process.env.NODE_ENV !== 'production') {
    if (validReducerKeys.length === 0) {
      const errorMessage = getNoValidReducersError()
      throw new Error(errorMessage)
    }
  }

  let shapeAssertionError
  try {
    assertReducerShape(validReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  return function combination(state = Immutable({}), action) {
    if (shapeAssertionError) {
      throw new Error(shapeAssertionError)
    }

    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getPossibleUnexpectedStateShapeWarning(state, validReducers, action)
      if (warningMessage) {
        // eslint-disable-next-line no-console
        console.warn(warningMessage)
      }
    }

    return validReducerKeys.reduce((nextState, key) => {
      const nextDomainState = validReducers[key](state[key], action)

      // Validate the next state; it cannot be undefined.
      if (typeof nextDomainState === 'undefined') {
        const errorMessage = getUndefinedStateError(key, action)
        throw new Error(errorMessage)
      }

      return nextState.set(key, nextDomainState)
    }, Immutable(state))
  }
}
