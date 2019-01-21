import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A menu item may include a header or may itself be a header.
 */

function MenuHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('header', className);
  var rest = getUnhandledProps(MenuHeader, props);
  var ElementType = getElementType(MenuHeader, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

MenuHeader.handledProps = ["as", "children", "className", "content"];
MenuHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default MenuHeader;