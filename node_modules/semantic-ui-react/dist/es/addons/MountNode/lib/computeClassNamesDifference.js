import _difference from "lodash/difference";

var computeClassNamesDifference = function computeClassNamesDifference(prevClassNames, currentClassNames) {
  return [_difference(currentClassNames, prevClassNames), _difference(prevClassNames, currentClassNames)];
};

export default computeClassNamesDifference;