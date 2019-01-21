import Immutable from 'seamless-immutable'

const REDUX_INIT_ACTION_TYPE = '@@redux/INIT'

export function getUndefinedStateError (reducerKey, action) {
  const actionType = action && action.type ? `"${action.type}"` : 'an'

  return (
    `Reducer "${reducerKey}" returned undefined when handling ${actionType} ` +
    `action. To ignore an action, you must explicitly return the previous state.`
  )
}

export function getNoValidReducersError () {
  return (
    'Store does not have a valid reducer. Make sure the argument passed ' +
    'to combineReducers is an object whose values are reducers.'
  )
}

export function getNotSupportedTypeAsReducerError (reducers, reducerKey) {
  return (
    `"${typeof reducers[reducerKey]}" is not a supported type for reducer "${reducerKey}". ` +
    'A reducer must be a function.'
  )
}

export function getPossibleUnexpectedStateShapeWarning (state, reducers, action) {
  const reducerKeys = Object.keys(reducers)
  const stateName = action && action.type === REDUX_INIT_ACTION_TYPE
    ? 'preloadedState argument passed to createStore'
    : 'previous state received by the reducer'

  if (!Immutable.isImmutable(state)) {
    return (
      `The ${stateName} is of an unexpected type. Expected state to be an instance of a ` +
      `Seamless Immutable object with the following properties: "${reducerKeys.join('", "')}".`
    )
  }

  const unexpectedKeys = Object.keys(state).filter(key => !reducers.hasOwnProperty(key))

  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} "${unexpectedKeys.join('", "')}" ` +
      `found in ${stateName}. Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    )
  }
}

export function assertReducerShape (reducers) {
  Object.keys(reducers).forEach(key => {
    const reducer = reducers[key]
    const initialState = reducer(undefined, { type: REDUX_INIT_ACTION_TYPE })

    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined. If you don't want to set a value for this reducer, ` +
        `you can use null instead of undefined.`
      )
    }

    const type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.')
    if (typeof reducer(undefined, { type }) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${REDUX_INIT_ACTION_TYPE} or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}
