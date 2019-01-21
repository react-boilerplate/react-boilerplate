'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (action) {
  return action && action.type === '@@redux/INIT' ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
};

module.exports = exports['default'];
//# sourceMappingURL=getStateName.js.map