import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A menu can contain a sub menu.
 */

function MenuMenu(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      position = props.position;
  var classes = cx(position, 'menu', className);
  var rest = getUnhandledProps(MenuMenu, props);
  var ElementType = getElementType(MenuMenu, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

MenuMenu.handledProps = ["as", "children", "className", "content", "position"];
MenuMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A sub menu can take left or right position. */
  position: PropTypes.oneOf(['left', 'right'])
} : {};
export default MenuMenu;