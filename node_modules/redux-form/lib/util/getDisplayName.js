'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var getDisplayName = function getDisplayName(Comp) {
  return Comp.displayName || Comp.name || 'Component';
};
exports.default = getDisplayName;