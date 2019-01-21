import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useVerticalAlignProp } from '../../lib';
import ItemHeader from './ItemHeader';
import ItemDescription from './ItemDescription';
import ItemExtra from './ItemExtra';
import ItemMeta from './ItemMeta';
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
  var classes = cx(useVerticalAlignProp(verticalAlign), 'content', className);
  var rest = getUnhandledProps(ItemContent, props);
  var ElementType = getElementType(ItemContent, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), ItemHeader.create(header, {
    autoGenerateKey: false
  }), ItemMeta.create(meta, {
    autoGenerateKey: false
  }), ItemDescription.create(description, {
    autoGenerateKey: false
  }), ItemExtra.create(extra, {
    autoGenerateKey: false
  }), content);
}

ItemContent.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "meta", "verticalAlign"];
ItemContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for ItemDescription component. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for ItemExtra component. */
  extra: customPropTypes.itemShorthand,

  /** Shorthand for ItemHeader component. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for ItemMeta component. */
  meta: customPropTypes.itemShorthand,

  /** Content can specify its vertical alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS)
} : {};
export default ItemContent;