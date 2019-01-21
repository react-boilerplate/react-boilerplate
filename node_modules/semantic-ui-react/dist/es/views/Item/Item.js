import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import ItemContent from './ItemContent';
import ItemDescription from './ItemDescription';
import ItemExtra from './ItemExtra';
import ItemGroup from './ItemGroup';
import ItemHeader from './ItemHeader';
import ItemImage from './ItemImage';
import ItemMeta from './ItemMeta';
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
  var classes = cx('item', className);
  var rest = getUnhandledProps(Item, props);
  var ElementType = getElementType(Item, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), ItemImage.create(image, {
    autoGenerateKey: false
  }), React.createElement(ItemContent, {
    content: content,
    description: description,
    extra: extra,
    header: header,
    meta: meta
  }));
}

Item.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "image", "meta"];
Item.Content = ItemContent;
Item.Description = ItemDescription;
Item.Extra = ItemExtra;
Item.Group = ItemGroup;
Item.Header = ItemHeader;
Item.Image = ItemImage;
Item.Meta = ItemMeta;
Item.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for ItemContent component. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for ItemDescription component. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for ItemExtra component. */
  extra: customPropTypes.itemShorthand,

  /** Shorthand for ItemHeader component. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for ItemImage component. */
  image: customPropTypes.itemShorthand,

  /** Shorthand for ItemMeta component. */
  meta: customPropTypes.itemShorthand
} : {};
export default Item;