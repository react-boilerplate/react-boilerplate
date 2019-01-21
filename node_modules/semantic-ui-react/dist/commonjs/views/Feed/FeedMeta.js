"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _FeedLike = _interopRequireDefault(require("./FeedLike"));

/**
 * A feed can contain a meta.
 */
function FeedMeta(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      like = props.like;
  var classes = (0, _classnames.default)('meta', className);
  var rest = (0, _lib.getUnhandledProps)(FeedMeta, props);
  var ElementType = (0, _lib.getElementType)(FeedMeta, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), (0, _lib.createShorthand)(_FeedLike.default, function (val) {
    return {
      content: val
    };
  }, like, {
    autoGenerateKey: false
  }), content);
}

FeedMeta.handledProps = ["as", "children", "className", "content", "like"];
FeedMeta.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for FeedLike. */
  like: _lib.customPropTypes.itemShorthand
} : {};
var _default = FeedMeta;
exports.default = _default;