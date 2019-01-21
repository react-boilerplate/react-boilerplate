import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A content sub-component for the Reveal.
 */

function RevealContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      hidden = props.hidden,
      visible = props.visible;
  var classes = cx('ui', useKeyOnly(hidden, 'hidden'), useKeyOnly(visible, 'visible'), 'content', className);
  var rest = getUnhandledProps(RevealContent, props);
  var ElementType = getElementType(RevealContent, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

RevealContent.handledProps = ["as", "children", "className", "content", "hidden", "visible"];
RevealContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A reveal may contain content that is visible before interaction. */
  hidden: PropTypes.bool,

  /** A reveal may contain content that is hidden before user interaction. */
  visible: PropTypes.bool
} : {};
export default RevealContent;