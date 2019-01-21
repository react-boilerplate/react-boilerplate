'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractTypeName = exports.applyMap = exports.compact = exports.isEnzymeWrapper = exports.isCheerioWrapper = exports.isReactWrapper = exports.isShallowWrapper = undefined;

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _ShallowWrapper = require('enzyme/build/ShallowWrapper');

var _ShallowWrapper2 = _interopRequireDefault(_ShallowWrapper);

var _ReactWrapper = require('enzyme/build/ReactWrapper');

var _ReactWrapper2 = _interopRequireDefault(_ReactWrapper);

var _Debug = require('enzyme/build/Debug');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHALLOW_WRAPPER_NAME = _ShallowWrapper2.default.name;
var REACT_WRAPPER_NAME = _ReactWrapper2.default.name;

var isShallowWrapper = exports.isShallowWrapper = function isShallowWrapper(wrapper) {
  return !(0, _isNil2.default)(wrapper) && !(0, _isNil2.default)(wrapper.constructor) && wrapper.constructor.name === SHALLOW_WRAPPER_NAME;
};

var isReactWrapper = exports.isReactWrapper = function isReactWrapper(wrapper) {
  return !(0, _isNil2.default)(wrapper) && !(0, _isNil2.default)(wrapper.constructor) && wrapper.constructor.name === REACT_WRAPPER_NAME;
};

var isCheerioWrapper = exports.isCheerioWrapper = function isCheerioWrapper(wrapper) {
  return !(0, _isNil2.default)(wrapper) && !(0, _isNil2.default)(wrapper.cheerio);
};

var isEnzymeWrapper = exports.isEnzymeWrapper = function isEnzymeWrapper(wrapper) {
  return isShallowWrapper(wrapper) || isReactWrapper(wrapper) || isCheerioWrapper(wrapper);
};

var compact = exports.compact = function compact(array) {
  return (0, _filter2.default)(array, function (item) {
    return !(0, _isNil2.default)(item) && item !== '';
  });
};

var applyMap = exports.applyMap = function applyMap(json, options) {
  if (typeof options.map === 'function') {
    return options.map(json);
  }
  return json;
};

var extractTypeName = exports.extractTypeName = function extractTypeName(node) {
  var name = (0, _Debug.typeName)(node);
  if (name === Symbol.for('react.fragment')) {
    return 'React.Fragment';
  }

  return name;
};