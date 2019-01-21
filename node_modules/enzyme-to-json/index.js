'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSerializer = exports.renderToJson = exports.shallowToJson = exports.mountToJson = undefined;

exports.default = function (wrapper, options) {
  if ((0, _utils.isShallowWrapper)(wrapper)) {
    return (0, _shallow2.default)(wrapper, options);
  }

  if ((0, _utils.isReactWrapper)(wrapper)) {
    return (0, _mount2.default)(wrapper, options);
  }

  if ((0, _utils.isCheerioWrapper)(wrapper)) {
    return (0, _render2.default)(wrapper, options);
  }
};

var _utils = require('./utils');

var _shallow = require('./shallow');

var _shallow2 = _interopRequireDefault(_shallow);

var _mount = require('./mount');

var _mount2 = _interopRequireDefault(_mount);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _createSerializer = require('./createSerializer');

var _createSerializer2 = _interopRequireDefault(_createSerializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.mountToJson = _mount2.default;
exports.shallowToJson = _shallow2.default;
exports.renderToJson = _render2.default;
exports.createSerializer = _createSerializer2.default;