import createIsValid from './isValid';


var createIsInvalid = function createIsInvalid(structure) {
  return function (form, getFormState) {
    var isValid = createIsValid(structure)(form, getFormState);
    return function (state) {
      return !isValid(state);
    };
  };
};

export default createIsInvalid;