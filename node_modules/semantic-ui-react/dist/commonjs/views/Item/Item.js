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

var _ItemContent = _interopRequireDefault(require("./ItemContent"));

var _ItemDescription = _interopRequireDefault(require("./ItemDescription"));

var _ItemExtra = _interopRequireDefault(require("./ItemExtra"));

var _ItemGroup = _interopRequireDefault(require("./ItemGroup"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _ItemImage = _interopRequireDefault(require("./ItemImage"));

var _ItemMeta = _interopRequireDefault(require("./ItemMeta"));

/**
 * An item view presents large collections of site content for display.
 */
function Item(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      extra = props.extra,
      header = props.header,
      image = props.image,
      meta = props.meta;
  var classes = (0, _classnames.default)('item', className);
  var rest = (0, _lib.getUnhandledProps)(Item, props);
  var ElementType = (0, _lib.getElementType)(Item, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _ItemImage.default.create(image, {
    autoGenerateKey: false
  }), _react.default.createElement(_ItemContent.default, {
    content: content,
    description: description,
    extra: extra,
    header: header,
    meta: meta
  }));
}

Item.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "image", "meta"];
Item.Content = _ItemContent.default;
Item.Description = _ItemDescription.default;
Item.Extra = _ItemExtra.default;
Item.Group = _ItemGroup.default;
Item.Header = _ItemHeader.default;
Item.Image = _ItemImage.default;
Item.Meta = _ItemMeta.default;
Item.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for ItemContent component. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for ItemDescription component. */
  description: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ItemExtra component. */
  extra: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ItemHeader component. */
  header: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ItemImage component. */
  image: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ItemMeta component. */
  meta: _lib.customPropTypes.itemShorthand
} : {};
var _default = Item;
exports.default = _default;