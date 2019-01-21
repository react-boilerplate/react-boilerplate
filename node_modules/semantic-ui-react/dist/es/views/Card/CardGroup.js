import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import _map from "lodash/map";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useTextAlignProp, useWidthProp } from '../../lib';
import Card from './Card';
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
  var classes = cx('ui', useKeyOnly(centered, 'centered'), useKeyOnly(doubling, 'doubling'), useKeyOnly(stackable, 'stackable'), useTextAlignProp(textAlign), useWidthProp(itemsPerRow), 'cards', className);
  var rest = getUnhandledProps(CardGroup, props);
  var ElementType = getElementType(CardGroup, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  if (!childrenUtils.isNil(content)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), content);
  }

  var itemsJSX = _map(items, function (item) {
    var key = item.key || [item.header, item.description].join('-');
    return React.createElement(Card, _extends({
      key: key
    }, item));
  });

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), itemsJSX);
}

CardGroup.handledProps = ["as", "centered", "children", "className", "content", "doubling", "items", "itemsPerRow", "stackable", "textAlign"];
CardGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A group of cards can center itself inside its container. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A group of cards can double its column width for mobile. */
  doubling: PropTypes.bool,

  /** Shorthand array of props for Card. */
  items: customPropTypes.collectionShorthand,

  /** A group of cards can set how many cards should exist in a row. */
  itemsPerRow: PropTypes.oneOf(SUI.WIDTHS),

  /** A group of cards can automatically stack rows to a single columns on mobile devices. */
  stackable: PropTypes.bool,

  /** A card group can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified'))
} : {};
export default CardGroup;