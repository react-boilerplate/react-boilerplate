"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Card = _interopRequireDefault(require("./Card"));

/**
 * A group of cards.
 */
function CardGroup(props) {
  var centered = props.centered,
      children = props.children,
      className = props.className,
      content = props.content,
      doubling = props.doubling,
      items = props.items,
      itemsPerRow = props.itemsPerRow,
      stackable = props.stackable,
      textAlign = props.textAlign;
  var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(centered, 'centered'), (0, _lib.useKeyOnly)(doubling, 'doubling'), (0, _lib.useKeyOnly)(stackable, 'stackable'), (0, _lib.useTextAlignProp)(textAlign), (0, _lib.useWidthProp)(itemsPerRow), 'cards', className);
  var rest = (0, _lib.getUnhandledProps)(CardGroup, props);
  var ElementType = (0, _lib.getElementType)(CardGroup, props);

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
    var key = item.key || [item.header, item.description].join('-');
    return _react.default.createElement(_Card.default, (0, _extends2.default)({
      key: key
    }, item));
  });
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), itemsJSX);
}

CardGroup.handledProps = ["as", "centered", "children", "className", "content", "doubling", "items", "itemsPerRow", "stackable", "textAlign"];
CardGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A group of cards can center itself inside its container. */
  centered: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A group of cards can double its column width for mobile. */
  doubling: _propTypes.default.bool,

  /** Shorthand array of props for Card. */
  items: _lib.customPropTypes.collectionShorthand,

  /** A group of cards can set how many cards should exist in a row. */
  itemsPerRow: _propTypes.default.oneOf(_lib.SUI.WIDTHS),

  /** A group of cards can automatically stack rows to a single columns on mobile devices. */
  stackable: _propTypes.default.bool,

  /** A card group can adjust its text alignment. */
  textAlign: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.TEXT_ALIGNMENTS, 'justified'))
} : {};
var _default = CardGroup;
exports.default = _default;