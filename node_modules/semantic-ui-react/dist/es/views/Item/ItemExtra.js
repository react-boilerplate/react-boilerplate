import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * An item can contain extra content meant to be formatted separately from the main content.
 */

function ItemExtra(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('extra', className);
  var rest = getUnhandledProps(ItemExtra, props);
  var ElementType = getElementType(ItemExtra, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ItemExtra.handledProps = ["as", "children", "className", "content"];
ItemExtra.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
ItemExtra.create = createShorthandFactory(ItemExtra, function (content) {
  return {
    content: content
  };
});
export default ItemExtra;