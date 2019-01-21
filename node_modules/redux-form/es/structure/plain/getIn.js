import _toPath from 'lodash-es/toPath';


var getIn = function getIn(state, field) {
  if (!state) {
    return state;
  }

  var path = _toPath(field);
  var length = path.length;
  if (!length) {
    return undefined;
  }

  var result = state;
  for (var i = 0; i < length && result; ++i) {
    result = result[path[i]];
  }

  return result;
};

export default getIn;