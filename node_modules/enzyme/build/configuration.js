'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.merge = merge;
exports.reset = reset;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _validateAdapter = require('./validateAdapter');

var _validateAdapter2 = _interopRequireDefault(_validateAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var configuration = {};

function get() {
  return (0, _object2['default'])({}, configuration);
}

function merge(extra) {
  if (extra.adapter) {
    (0, _validateAdapter2['default'])(extra.adapter);
  }
  (0, _object2['default'])(configuration, extra);
}

function reset() {
  var replacementConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  configuration = {};
  merge(replacementConfig);
}