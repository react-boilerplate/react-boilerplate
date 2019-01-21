import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * An item can contain a description with a single or multiple paragraphs.
 */

function ItemDescription(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('description', className);
  var rest = getUnhandledProps(ItemDescription, props);
  var ElementType = getElementType(ItemDescription, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ItemDescription.handledProps = ["as", "children", "className", "content"];
ItemDescription.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
ItemDescription.create = createShorthandFactory(ItemDescription, function (content) {
  return {
    content: content
  };
});
export default ItemDescription;