import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A PopupContent displays the content body of a Popover.
 */

export default function PopupContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('content', className);
  var rest = getUnhandledProps(PopupContent, props);
  var ElementType = getElementType(PopupContent, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}
PopupContent.handledProps = ["as", "children", "className", "content"];
PopupContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The content of the Popup */
  children: PropTypes.node,

  /** Classes to add to the Popup content className. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
PopupContent.create = createShorthandFactory(PopupContent, function (children) {
  return {
    children: children
  };
});