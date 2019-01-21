'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createIsSubmitting = function createIsSubmitting(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return !!getIn(nonNullGetFormState(state), form + '.submitting');
    };
  };
};

exports.default = createIsSubmitting;