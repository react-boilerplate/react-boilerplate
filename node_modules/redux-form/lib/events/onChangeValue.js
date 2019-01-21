'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var _isReactNative = require('../isReactNative');

var _isReactNative2 = _interopRequireDefault(_isReactNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeValue = function onChangeValue(event, _ref) {
  var name = _ref.name,
      parse = _ref.parse,
      normalize = _ref.normalize;

  // read value from input
  var value = (0, _getValue2.default)(event, _isReactNative2.default);

  // parse value if we have a parser
  if (parse) {
    value = parse(value, name);
  }

  // normalize value
  if (normalize) {
    value = normalize(name, value);
  }

  return value;
};

exports.default = onChangeValue;