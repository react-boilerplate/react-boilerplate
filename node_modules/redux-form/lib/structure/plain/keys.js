"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


function keys(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(function (i) {
      return i.name;
    });
  }

  return Object.keys(value);
}
exports.default = keys;