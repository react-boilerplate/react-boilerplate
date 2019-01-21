'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  if (!config) return;

  for (var _len = arguments.length, properties = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    properties[_key - 1] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      var value = config[property];
      if (value && !hasPreset(property, value)) throw new _PresetError2.default(property, value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var _PresetError = require('../errors/PresetError');

var _PresetError2 = _interopRequireDefault(_PresetError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presets = {
  dir: ['ltr', 'rtl', 'auto'],
  orientation: ['any', 'natural', 'landscape', 'landscape-primary', 'landscape-secondary', 'portrait', 'portrait-primary', 'portrait-secondary'],
  display: ['fullscreen', 'standalone', 'minimal-ui', 'browser']
};

function hasPreset(key, value) {
  return presets[key].indexOf(value) >= 0;
}