'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = render;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _getAdapter = require('./getAdapter');

var _getAdapter2 = _interopRequireDefault(_getAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Renders a react component into static HTML and provides a cheerio wrapper around it. This is
 * somewhat asymmetric with `mount` and `shallow`, which don't use any external libraries, but
 * Cheerio's API is pretty close to what we actually want and has a significant amount of utility
 * that would be recreating the wheel if we didn't use it.
 *
 * I think there are a lot of good use cases to use `render` instead of `shallow` or `mount`, and
 * thus I'd like to keep this API in here even though it's not really "ours".
 *
 * @param node
 * @param options
 * @returns {Cheerio}
 */

function render(node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var adapter = (0, _getAdapter2['default'])(options);
  var renderer = adapter.createRenderer((0, _object2['default'])({ mode: 'string' }, options));
  var html = renderer.render(node, options.context);
  return _cheerio2['default'].load('')(html);
}