'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderChildToJson = function renderChildToJson(child, options) {
  if ((0, _isNil2.default)(child)) {
    return null;
  }

  if (child.type === 'tag') {
    return (0, _utils.applyMap)({
      node: child,
      type: child.name,
      props: child.attribs,
      children: (0, _utils.compact)(child.children.map(function (c) {
        return renderChildToJson(c, options);
      })),
      $$typeof: Symbol.for('react.test.json')
    }, options);
  } else if (child.type === 'text') {
    return child.data;
  }

  return null;
};

var renderToJson = function renderToJson(wrapper) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((0, _isNil2.default)(wrapper) || wrapper.length === 0) {
    return null;
  }

  return wrapper.length > 1 ? (0, _range2.default)(0, wrapper.length).map(function (node) {
    return renderChildToJson(wrapper[node], options);
  }) : renderChildToJson(wrapper[0], options);
};

exports.default = renderToJson;