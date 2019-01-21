import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * Used in some Button types, such as `animated`.
 */

function ButtonContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      hidden = props.hidden,
      visible = props.visible;
  var classes = cx(useKeyOnly(visible, 'visible'), useKeyOnly(hidden, 'hidden'), 'content', className);
  var rest = getUnhandledProps(ButtonContent, props);
  var ElementType = getElementType(ButtonContent, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ButtonContent.handledProps = ["as", "children", "className", "content", "hidden", "visible"];
ButtonContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Initially hidden, visible on hover. */
  hidden: PropTypes.bool,

  /** Initially visible, hidden on hover. */
  visible: PropTypes.bool
} : {};
export default ButtonContent;