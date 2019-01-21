import splice from './splice';
import getIn from './getIn';
import setIn from './setIn';
import deepEqual from './deepEqual';
import deleteIn from './deleteIn';
import keys from './keys';


var structure = {
  allowsArrayErrors: true,
  empty: {},
  emptyList: [],
  getIn: getIn,
  setIn: setIn,
  deepEqual: deepEqual,
  deleteIn: deleteIn,
  forEach: function forEach(items, callback) {
    return items.forEach(callback);
  },
  fromJS: function fromJS(value) {
    return value;
  },
  keys: keys,
  size: function size(array) {
    return array ? array.length : 0;
  },
  some: function some(items, callback) {
    return items.some(callback);
  },
  splice: splice,
  toJS: function toJS(value) {
    return value;
  }
};

export default structure;