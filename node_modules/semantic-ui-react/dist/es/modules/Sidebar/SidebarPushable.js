import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A pushable sub-component for Sidebar.
 */

function SidebarPushable(props) {
  var className = props.className,
      children = props.children,
      content = props.content;
  var classes = cx('pushable', className);
  var rest = getUnhandledProps(SidebarPushable, props);
  var ElementType = getElementType(SidebarPushable, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

SidebarPushable.handledProps = ["as", "children", "className", "content"];
SidebarPushable.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default SidebarPushable;