import { Iterable, List } from 'immutable';
import plainKeys from '../plain/keys';

var empty = List();

var keys = function keys(value) {
  if (List.isList(value)) {
    return value.map(function (i) {
      return i.name;
    });
  }

  if (Iterable.isIterable(value)) {
    return value.keySeq();
  }

  return value ? List(plainKeys(value)) : empty;
};

export default keys;