'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (nextState, reducerName, action) {
  // eslint-disable-next-line no-undefined
  if (nextState === undefined) {
    throw new Error('Reducer "' + reducerName + '" returned undefined when handling "' + action.type + '" action. To ignore an action, you must explicitly return the previous state.');
  }
};

module.exports = exports['default'];
//# sourceMappingURL=validateNextState.js.map