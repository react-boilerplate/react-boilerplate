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

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _ItemDescription = _interopRequireDefault(require("./ItemDescription"));

var _ItemExtra = _interopRequireDefault(require("./ItemExtra"));

var _ItemMeta = _interopRequireDefault(require("./ItemMeta"));

/**
 * An item can contain content.
 */
function ItemContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      extra = props.extra,
      header = props.header,
      meta = props.meta,
      verticalAlign = props.verticalAlign;
  var classes = (0, _classnames.default)((0, _lib.useVerticalAlignProp)(verticalAlign), 'content', className);
  var rest = (0, _lib.getUnhandledProps)(ItemContent, props);
  var ElementType = (0, _lib.getElementType)(ItemContent, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _ItemHeader.default.create(header, {
    autoGenerateKey: false
  }), _ItemMeta.default.create(meta, {
    autoGenerateKey: false
  }), _ItemDescription.default.create(description, {
    autoGenerateKey: false
  }), _ItemExtra.default.create(extra, {
    autoGenerateKey: false
  }), content);
}

ItemContent.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "meta", "verticalAlign"];
ItemContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for ItemDescription component. */
  description: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ItemExtra component. */
  extra: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ItemHeader component. */
  header: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ItemMeta component. */
  meta: _lib.customPropTypes.itemShorthand,

  /** Content can specify its vertical alignment. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS)
} : {};
var _default = ItemContent;
exports.default = _default;