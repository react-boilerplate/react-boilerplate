'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinURI = joinURI;
exports.normalizeURI = normalizeURI;
function joinURI() {
  for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  var first = arr[0] || '';
  var join = arr.join('/');
  return normalizeURI(join[0] === '/' && first[0] !== '/' ? join.substring(1) : join);
}

function normalizeURI(uri) {
  return uri.replace(/(:\/\/)|(\\+|\/{2,})+/g, function (match) {
    return match === '://' ? '://' : '/';
  });
}