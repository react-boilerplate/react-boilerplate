function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var splice = function splice(array, index, removeNum, value) {
  array = array || [];

  if (index < array.length) {
    if (value === undefined && !removeNum) {
      // inserting undefined
      var _copy2 = [].concat(_toConsumableArray(array));
      _copy2.splice(index, 0, true); // temporary placeholder
      _copy2[index] = undefined; // set to undefined
      return _copy2;
    }
    if (value != null) {
      var _copy3 = [].concat(_toConsumableArray(array));
      _copy3.splice(index, removeNum, value); // removing and adding
      return _copy3;
    }
    var _copy = [].concat(_toConsumableArray(array));
    _copy.splice(index, removeNum); // removing
    return _copy;
  }
  if (removeNum) {
    // trying to remove non-existant item: return original array
    return array;
  }
  // trying to add outside of range: just set value
  var copy = [].concat(_toConsumableArray(array));
  copy[index] = value;
  return copy;
};

export default splice;