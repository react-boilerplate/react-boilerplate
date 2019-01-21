import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A list item can contain a header.
 */

function ListHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('header', className);
  var rest = getUnhandledProps(ListHeader, props);
  var ElementType = getElementType(ListHeader, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ListHeader.handledProps = ["as", "children", "className", "content"];
ListHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
ListHeader.create = createShorthandFactory(ListHeader, function (content) {
  return {
    content: content
  };
});
export default ListHeader;