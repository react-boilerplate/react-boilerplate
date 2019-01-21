'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isReactNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

exports.default = isReactNative;