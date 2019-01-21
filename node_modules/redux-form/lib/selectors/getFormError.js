'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createGetFormError = function createGetFormError(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return getIn(nonNullGetFormState(state), form + '.error');
    };
  };
};

exports.default = createGetFormError;