'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var formatName = function formatName(_ref, name) {
  var sectionPrefix = _ref._reduxForm.sectionPrefix;
  return sectionPrefix ? sectionPrefix + '.' + name : name;
};
exports.default = formatName;