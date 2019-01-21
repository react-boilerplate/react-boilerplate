'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routerReducer;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _seamlessImmutable2.default)({
  locationBeforeTransitions: null
});

function routerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  if (type === _reactRouterRedux.LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', payload);
  }
  return state;
}