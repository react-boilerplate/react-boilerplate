"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _CardDescription = _interopRequireDefault(require("./CardDescription"));

var _CardHeader = _interopRequireDefault(require("./CardHeader"));

var _CardMeta = _interopRequireDefault(require("./CardMeta"));

/**
 * A card can contain blocks of content or extra content meant to be formatted separately from the main content.
 */
function CardContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      extra = props.extra,
      header = props.header,
      meta = props.meta,
      textAlign = props.textAlign;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(extra, 'extra'), (0, _lib.useTextAlignProp)(textAlign), 'content', className);
  var rest = (0, _lib.getUnhandledProps)(CardContent, props);
  var ElementType = (0, _lib.getElementType)(CardContent, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  if (!_lib.childrenUtils.isNil(content)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), content);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), (0, _lib.createShorthand)(_CardHeader.default, function (val) {
    return {
      content: val
    };
  }, header, {
    autoGenerateKey: false
  }), (0, _lib.createShorthand)(_CardMeta.default, function (val) {
    return {
      content: val
    };
  }, meta, {
    autoGenerateKey: false
  }), (0, _lib.createShorthand)(_CardDescription.default, function (val) {
    return {
      content: val
    };
  }, description, {
    autoGenerateKey: false
  }));
}

CardContent.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "meta", "textAlign"];
CardContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for CardDescription. */
  description: _lib.customPropTypes.itemShorthand,

  /** A card can contain extra content meant to be formatted separately from the main content. */
  extra: _propTypes.default.bool,

  /** Shorthand for CardHeader. */
  header: _lib.customPropTypes.itemShorthand,

  /** Shorthand for CardMeta. */
  meta: _lib.customPropTypes.itemShorthand,

  /** A card content can adjust its text alignment. */
  textAlign: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.TEXT_ALIGNMENTS, 'justified'))
} : {};
var _default = CardContent;
exports.default = _default;