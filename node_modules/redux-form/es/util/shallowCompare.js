import _isEqualWith from 'lodash-es/isEqualWith';


var customizer = function customizer(objectValue, otherValue, indexOrkey, object, other, stack) {
  // https://lodash.com/docs/4.17.4#isEqualWith
  if (stack) {
    // Shallow compares
    // For 1st level, stack === undefined.
    //   -> Do nothing (and implicitly return undefined so that it goes to compare 2nd level)
    // For 2nd level and up, stack !== undefined.
    //   -> Compare by === operator
    return objectValue === otherValue;
  }
};

var shallowCompare = function shallowCompare(instance, nextProps, nextState) {
  var propsEqual = _isEqualWith(instance.props, nextProps, customizer);
  var stateEqual = _isEqualWith(instance.state, nextState, customizer);

  return !propsEqual || !stateEqual;
};

export default shallowCompare;