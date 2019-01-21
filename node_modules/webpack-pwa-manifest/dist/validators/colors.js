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

      var color = config[property];
      if (color && !(isHexColor(color) || isCssColor(color) || isRgbColor(color) || isRgbaColor(color))) throw new _PresetError2.default(property, color);
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

var _cssColorNames = require('css-color-names');

var _cssColorNames2 = _interopRequireDefault(_cssColorNames);

var _PresetError = require('../errors/PresetError');

var _PresetError2 = _interopRequireDefault(_PresetError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
function isHexColor(color) {
  return (/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color)
  );
}

function isCssColor(color) {
  return typeof color === 'string' && _cssColorNames2.default[color];
}

function isRgbColor(color) {
  return (/rgb\([\d]{1,3}, [\d]{1,3}, [\d]{1,3}\)/.test(color)
  );
}

function isRgbaColor(color) {
  return (/rgba\([\d]{1,3}, [\d]{1,3}, [\d]{1,3}, \d\.\d+\)/.test(color)
  );
}