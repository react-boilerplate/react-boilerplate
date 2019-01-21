'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSerializer;

var _utils = require('./utils');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSerializer(options) {
  return {
    test(wrapper) {
      return (0, _utils.isEnzymeWrapper)(wrapper);
    },
    print(wrapper, serializer) {
      return serializer((0, _2.default)(wrapper, options));
    }
  };
}