"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * A comment can contain an image or avatar.
 */
function CommentAvatar(props) {
  var className = props.className,
      src = props.src;
  var classes = (0, _classnames.default)('avatar', className);
  var rest = (0, _lib.getUnhandledProps)(CommentAvatar, props);

  var _partitionHTMLProps = (0, _lib.partitionHTMLProps)(rest, {
    htmlProps: _lib.htmlImageProps
  }),
      _partitionHTMLProps2 = (0, _slicedToArray2.default)(_partitionHTMLProps, 2),
      imageProps = _partitionHTMLProps2[0],
      rootProps = _partitionHTMLProps2[1];

  var ElementType = (0, _lib.getElementType)(CommentAvatar, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rootProps, {
    className: classes
  }), (0, _lib.createHTMLImage)(src, {
    autoGenerateKey: false,
    defaultProps: imageProps
  }));
}

CommentAvatar.handledProps = ["as", "className", "src"];
CommentAvatar.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Specifies the URL of the image. */
  src: _propTypes.default.string
} : {};
var _default = CommentAvatar;
exports.default = _default;