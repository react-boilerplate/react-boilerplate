"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * A feed can contain an extra content.
 */
function FeedExtra(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      images = props.images,
      text = props.text;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(images, 'images'), (0, _lib.useKeyOnly)(content || text, 'text'), 'extra', className);
  var rest = (0, _lib.getUnhandledProps)(FeedExtra, props);
  var ElementType = (0, _lib.getElementType)(FeedExtra, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  } // TODO need a "collection factory" to handle creating multiple image elements and their keys


  var imageElements = (0, _map2.default)(images, function (image, index) {
    var key = [index, image].join('-');
    return (0, _lib.createHTMLImage)(image, {
      key: key
    });
  });
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), content, imageElements);
}

FeedExtra.handledProps = ["as", "children", "className", "content", "images", "text"];
FeedExtra.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** An event can contain additional information like a set of images. */
  images: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['text']), _propTypes.default.oneOfType([_propTypes.default.bool, _lib.customPropTypes.collectionShorthand])]),

  /** An event can contain additional text information. */
  text: _propTypes.default.bool
} : {};
var _default = FeedExtra;
exports.default = _default;