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

var _FeedDate = _interopRequireDefault(require("./FeedDate"));

var _FeedExtra = _interopRequireDefault(require("./FeedExtra"));

var _FeedMeta = _interopRequireDefault(require("./FeedMeta"));

var _FeedSummary = _interopRequireDefault(require("./FeedSummary"));

function FeedContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      extraImages = props.extraImages,
      extraText = props.extraText,
      date = props.date,
      meta = props.meta,
      summary = props.summary;
  var classes = (0, _classnames.default)('content', className);
  var rest = (0, _lib.getUnhandledProps)(FeedContent, props);
  var ElementType = (0, _lib.getElementType)(FeedContent, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), (0, _lib.createShorthand)(_FeedDate.default, function (val) {
    return {
      content: val
    };
  }, date, {
    autoGenerateKey: false
  }), (0, _lib.createShorthand)(_FeedSummary.default, function (val) {
    return {
      content: val
    };
  }, summary, {
    autoGenerateKey: false
  }), content, (0, _lib.createShorthand)(_FeedExtra.default, function (val) {
    return {
      text: true,
      content: val
    };
  }, extraText, {
    autoGenerateKey: false
  }), (0, _lib.createShorthand)(_FeedExtra.default, function (val) {
    return {
      images: val
    };
  }, extraImages, {
    autoGenerateKey: false
  }), (0, _lib.createShorthand)(_FeedMeta.default, function (val) {
    return {
      content: val
    };
  }, meta, {
    autoGenerateKey: false
  }));
}

FeedContent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "meta", "summary"];
FeedContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** An event can contain a date. */
  date: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: _FeedExtra.default.propTypes.images,

  /** Shorthand for FeedExtra with text. */
  extraText: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: _lib.customPropTypes.itemShorthand
} : {};
var _default = FeedContent;
exports.default = _default;