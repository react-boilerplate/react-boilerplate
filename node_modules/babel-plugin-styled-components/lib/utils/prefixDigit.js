"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixLeadingDigit;

function prefixLeadingDigit(str) {
  return str.replace(/^(\d)/, 'sc-$1');
}