import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
import _map from "lodash/map";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly, useKeyOrValueAndKey } from '../../lib';
import Item from './Item';
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
  var classes = cx('ui', useKeyOnly(divided, 'divided'), useKeyOnly(link, 'link'), useKeyOnly(unstackable, 'unstackable'), useKeyOrValueAndKey(relaxed, 'relaxed'), 'items', className);
  var rest = getUnhandledProps(ItemGroup, props);
  var ElementType = getElementType(ItemGroup, props);

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
    var childKey = item.childKey,
        itemProps = _objectWithoutProperties(item, ["childKey"]);

    var finalKey = childKey || [itemProps.content, itemProps.description, itemProps.header, itemProps.meta].join('-');
    return React.createElement(Item, _extends({}, itemProps, {
      key: finalKey
    }));
  });

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), itemsJSX);
}

ItemGroup.handledProps = ["as", "children", "className", "content", "divided", "items", "link", "relaxed", "unstackable"];
ItemGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Items can be divided to better distinguish between grouped content. */
  divided: PropTypes.bool,

  /** Shorthand array of props for Item. */
  items: customPropTypes.collectionShorthand,

  /** An item can be formatted so that the entire contents link to another page. */
  link: PropTypes.bool,

  /** A group of items can relax its padding to provide more negative space. */
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /** Prevent items from stacking on mobile. */
  unstackable: PropTypes.bool
} : {};
export default ItemGroup;