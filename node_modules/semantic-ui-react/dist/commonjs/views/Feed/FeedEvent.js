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

var _FeedContent = _interopRequireDefault(require("./FeedContent"));

var _FeedLabel = _interopRequireDefault(require("./FeedLabel"));

/**
 * A feed contains an event.
 */
function FeedEvent(props) {
  var content = props.content,
      children = props.children,
      className = props.className,
      date = props.date,
      extraImages = props.extraImages,
      extraText = props.extraText,
      image = props.image,
      icon = props.icon,
      meta = props.meta,
      summary = props.summary;
  var classes = (0, _classnames.default)('event', className);
  var rest = (0, _lib.getUnhandledProps)(FeedEvent, props);
  var ElementType = (0, _lib.getElementType)(FeedEvent, props);
  var hasContentProp = content || date || extraImages || extraText || meta || summary;
  var contentProps = {
    content: content,
    date: date,
    extraImages: extraImages,
    extraText: extraText,
    meta: meta,
    summary: summary
  };
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), (0, _lib.createShorthand)(_FeedLabel.default, function (val) {
    return {
      icon: val
    };
  }, icon, {
    autoGenerateKey: false
  }), (0, _lib.createShorthand)(_FeedLabel.default, function (val) {
    return {
      image: val
    };
  }, image, {
    autoGenerateKey: false
  }), hasContentProp && _react.default.createElement(_FeedContent.default, contentProps), children);
}

FeedEvent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "icon", "image", "meta", "summary"];
FeedEvent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for FeedContent. */
  content: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedDate. */
  date: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with content. */
  extraText: _lib.customPropTypes.itemShorthand,

  /** An event can contain icon label. */
  icon: _lib.customPropTypes.itemShorthand,

  /** An event can contain image label. */
  image: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: _lib.customPropTypes.itemShorthand
} : {};
var _default = FeedEvent;
exports.default = _default;