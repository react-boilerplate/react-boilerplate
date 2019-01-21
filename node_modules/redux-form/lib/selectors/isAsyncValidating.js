'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createIsAsyncValidating = function createIsAsyncValidating(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return !!getIn(nonNullGetFormState(state), form + '.asyncValidating');
    };
  };
};

exports.default = createIsAsyncValidating;