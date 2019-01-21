import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A dropdown menu can contain a menu.
 */

function DropdownMenu(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      direction = props.direction,
      open = props.open,
      scrolling = props.scrolling;
  var classes = cx(direction, useKeyOnly(open, 'visible'), useKeyOnly(scrolling, 'scrolling'), 'menu transition', className);
  var rest = getUnhandledProps(DropdownMenu, props);
  var ElementType = getElementType(DropdownMenu, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

DropdownMenu.handledProps = ["as", "children", "className", "content", "direction", "open", "scrolling"];
DropdownMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A dropdown menu can open to the left or to the right. */
  direction: PropTypes.oneOf(['left', 'right']),

  /** Whether or not the dropdown menu is displayed. */
  open: PropTypes.bool,

  /** A dropdown menu can scroll. */
  scrolling: PropTypes.bool
} : {};
export default DropdownMenu;