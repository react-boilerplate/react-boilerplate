"use strict";

exports.__esModule = true;
if (typeof exports !== "undefined") Object.defineProperty(exports, "babelPluginFlowReactPropTypes_proptype_Broadcast", {
  value: require("prop-types").shape({
    publish: require("prop-types").func.isRequired,
    subscribe: require("prop-types").func.isRequired,
    unsubscribe: require("prop-types").func.isRequired
  })
});
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialState) {
  var listeners = {};
  var id = 0;
  var state = initialState;

  function publish(nextState) {
    state = nextState;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in listeners) {
      var _listener = listeners[key];
      if (_listener === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }

      _listener(state);
    }
  }

  function subscribe(listener) {
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    listener(state);
    return currentId;
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined;
  }

  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
};

exports.default = createBroadcast;
module.exports = exports["default"];