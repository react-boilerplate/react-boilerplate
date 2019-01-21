import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * Header content wraps the main content when there is an adjacent Icon or Image.
 */

function HeaderContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('content', className);
  var rest = getUnhandledProps(HeaderContent, props);
  var ElementType = getElementType(HeaderContent, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

HeaderContent.handledProps = ["as", "children", "className", "content"];
HeaderContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default HeaderContent;