'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isHotReloading = function isHotReloading() {
  return !!(typeof module !== 'undefined' && module.hot && typeof module.hot.status === 'function' && module.hot.status() === 'apply');
};

exports.default = isHotReloading;