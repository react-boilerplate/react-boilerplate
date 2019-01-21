'use strict';

exports.__esModule = true;
exports.takeEvery = takeEvery;
exports.takeLatest = takeLatest;
exports.throttle = throttle;

var _io = /*#__PURE__*/require('./io');

var _sagaHelpers = /*#__PURE__*/require('./sagaHelpers');

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return _io.fork.apply(undefined, [_sagaHelpers.takeEveryHelper, patternOrChannel, worker].concat(args));
}

function takeLatest(patternOrChannel, worker) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return _io.fork.apply(undefined, [_sagaHelpers.takeLatestHelper, patternOrChannel, worker].concat(args));
}

function throttle(ms, pattern, worker) {
  for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  return _io.fork.apply(undefined, [_sagaHelpers.throttleHelper, ms, pattern, worker].concat(args));
}