'use strict';

var _ReactWrapper = require('./ReactWrapper');

var _ReactWrapper2 = _interopRequireDefault(_ReactWrapper);

var _ShallowWrapper = require('./ShallowWrapper');

var _ShallowWrapper2 = _interopRequireDefault(_ShallowWrapper);

var _EnzymeAdapter = require('./EnzymeAdapter');

var _EnzymeAdapter2 = _interopRequireDefault(_EnzymeAdapter);

var _mount = require('./mount');

var _mount2 = _interopRequireDefault(_mount);

var _shallow = require('./shallow');

var _shallow2 = _interopRequireDefault(_shallow);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _configuration = require('./configuration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = {
  render: _render2['default'],
  shallow: _shallow2['default'],
  mount: _mount2['default'],
  ShallowWrapper: _ShallowWrapper2['default'],
  ReactWrapper: _ReactWrapper2['default'],
  configure: _configuration.merge,
  EnzymeAdapter: _EnzymeAdapter2['default']
};