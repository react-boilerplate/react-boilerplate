import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * An item can contain a header.
 */

function ItemHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('header', className);
  var rest = getUnhandledProps(ItemHeader, props);
  var ElementType = getElementType(ItemHeader, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ItemHeader.handledProps = ["as", "children", "className", "content"];
ItemHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
ItemHeader.create = createShorthandFactory(ItemHeader, function (content) {
  return {
    content: content
  };
});
export default ItemHeader;