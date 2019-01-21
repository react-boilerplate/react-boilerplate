'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj, properties) {
  obj = obj || {};
  var response = {};
  if (typeof properties === 'string') properties = properties.split(/\s+/);
  for (var i in obj) {
    if (properties.indexOf(i) === -1) response[i] = obj[i];
  }return response;
};