'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getUndefinedStateError = getUndefinedStateError;
exports.getNoValidReducersError = getNoValidReducersError;
exports.getNotSupportedTypeAsReducerError = getNotSupportedTypeAsReducerError;
exports.getPossibleUnexpectedStateShapeWarning = getPossibleUnexpectedStateShapeWarning;
exports.assertReducerShape = assertReducerShape;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REDUX_INIT_ACTION_TYPE = '@@redux/INIT';

function getUndefinedStateError(reducerKey, action) {
  var actionType = action && action.type ? '"' + action.type + '"' : 'an';

  return 'Reducer "' + reducerKey + '" returned undefined when handling ' + actionType + ' ' + 'action. To ignore an action, you must explicitly return the previous state.';
}

function getNoValidReducersError() {
  return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
}

function getNotSupportedTypeAsReducerError(reducers, reducerKey) {
  return '"' + _typeof(reducers[reducerKey]) + '" is not a supported type for reducer "' + reducerKey + '". ' + 'A reducer must be a function.';
}

function getPossibleUnexpectedStateShapeWarning(state, reducers, action) {
  var reducerKeys = Object.keys(reducers);
  var stateName = action && action.type === REDUX_INIT_ACTION_TYPE ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (!_seamlessImmutable2.default.isImmutable(state)) {
    return 'The ' + stateName + ' is of an unexpected type. Expected state to be an instance of a ' + ('Seamless Immutable object with the following properties: "' + reducerKeys.join('", "') + '".');
  }

  var unexpectedKeys = Object.keys(state).filter(function (key) {
    return !reducers.hasOwnProperty(key);
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' "' + unexpectedKeys.join('", "') + '" ' + ('found in ' + stateName + '. Expected to find one of the known reducer keys instead: ') + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: REDUX_INIT_ACTION_TYPE });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + REDUX_INIT_ACTION_TYPE + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}