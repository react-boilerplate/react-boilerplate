"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Item = _interopRequireDefault(require("./Item"));

/**
 * A group of items.
 */
function ItemGroup(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      divided = props.divided,
      items = props.items,
      link = props.link,
      relaxed = props.relaxed,
      unstackable = props.unstackable;
  var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(divided, 'divided'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOnly)(unstackable, 'unstackable'), (0, _lib.useKeyOrValueAndKey)(relaxed, 'relaxed'), 'items', className);
  var rest = (0, _lib.getUnhandledProps)(ItemGroup, props);
  var ElementType = (0, _lib.getElementType)(ItemGroup, props);

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

  var itemsJSX = (0, _map2.default)(items, function (item) {
    var childKey = item.childKey,
        itemProps = (0, _objectWithoutProperties2.default)(item, ["childKey"]);
    var finalKey = childKey || [itemProps.content, itemProps.description, itemProps.header, itemProps.meta].join('-');
    return _react.default.createElement(_Item.default, (0, _extends2.default)({}, itemProps, {
      key: finalKey
    }));
  });
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), itemsJSX);
}

ItemGroup.handledProps = ["as", "children", "className", "content", "divided", "items", "link", "relaxed", "unstackable"];
ItemGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Items can be divided to better distinguish between grouped content. */
  divided: _propTypes.default.bool,

  /** Shorthand array of props for Item. */
  items: _lib.customPropTypes.collectionShorthand,

  /** An item can be formatted so that the entire contents link to another page. */
  link: _propTypes.default.bool,

  /** A group of items can relax its padding to provide more negative space. */
  relaxed: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /** Prevent items from stacking on mobile. */
  unstackable: _propTypes.default.bool
} : {};
var _default = ItemGroup;
exports.default = _default;