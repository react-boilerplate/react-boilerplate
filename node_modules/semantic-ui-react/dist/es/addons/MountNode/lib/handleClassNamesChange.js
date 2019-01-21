import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _forEach from "lodash/forEach";
import computeClassNames from './computeClassNames';
import computeClassNamesDifference from './computeClassNamesDifference';
var prevClassNames = new Map();

var handleClassNamesChange = function handleClassNamesChange(node, components) {
  var currentClassNames = computeClassNames(components);

  var _computeClassNamesDif = computeClassNamesDifference(prevClassNames.get(node), currentClassNames),
      _computeClassNamesDif2 = _slicedToArray(_computeClassNamesDif, 2),
      forAdd = _computeClassNamesDif2[0],
      forRemoval = _computeClassNamesDif2[1];

  _forEach(forAdd, function (className) {
    return node.classList.add(className);
  });

  _forEach(forRemoval, function (className) {
    return node.classList.remove(className);
  });

  prevClassNames.set(node, currentClassNames);
};

export default handleClassNamesChange;