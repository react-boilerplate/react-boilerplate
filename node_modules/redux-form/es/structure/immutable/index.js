import _toPath from 'lodash-es/toPath';
import { Map, Iterable, List, fromJS as _fromJS } from 'immutable';

import deepEqual from './deepEqual';
import keys from './keys';
import setIn from './setIn';
import splice from './splice';
import plainGetIn from '../plain/getIn';


var emptyList = List();

var structure = {
  allowsArrayErrors: false,
  empty: Map(),
  emptyList: emptyList,
  getIn: function getIn(state, field) {
    return Iterable.isIterable(state) ? state.getIn(_toPath(field)) : plainGetIn(state, field);
  },
  setIn: setIn,
  deepEqual: deepEqual,
  deleteIn: function deleteIn(state, field) {
    return state.deleteIn(_toPath(field));
  },
  forEach: function forEach(items, callback) {
    items.forEach(callback);
  },
  fromJS: function fromJS(jsValue) {
    return _fromJS(jsValue, function (key, value) {
      return Iterable.isIndexed(value) ? value.toList() : value.toMap();
    });
  },
  keys: keys,
  size: function size(list) {
    return list ? list.size : 0;
  },
  some: function some(items, callback) {
    return items.some(callback);
  },
  splice: splice,
  toJS: function toJS(value) {
    return Iterable.isIterable(value) ? value.toJS() : value;
  }
};

export default structure;