function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import createIsPristine from './isPristine';


var createIsDirty = function createIsDirty(structure) {
  return function (form, getFormState) {
    var isPristine = createIsPristine(structure)(form, getFormState);
    return function (state) {
      for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fields[_key - 1] = arguments[_key];
      }

      return !isPristine.apply(undefined, [state].concat(_toConsumableArray(fields)));
    };
  };
};

export default createIsDirty;