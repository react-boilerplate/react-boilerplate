'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getAdapter;

var _validateAdapter = require('./validateAdapter');

var _validateAdapter2 = _interopRequireDefault(_validateAdapter);

var _configuration = require('./configuration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getAdapter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (options.adapter) {
    (0, _validateAdapter2['default'])(options.adapter);
    return options.adapter;
  }

  var _get = (0, _configuration.get)(),
      adapter = _get.adapter;

  (0, _validateAdapter2['default'])(adapter);
  return adapter;
}