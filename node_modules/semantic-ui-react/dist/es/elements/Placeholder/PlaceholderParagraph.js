import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A placeholder can contain a paragraph.
 */

function PlaceholderParagraph(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('paragraph', className);
  var rest = getUnhandledProps(PlaceholderParagraph, props);
  var ElementType = getElementType(PlaceholderParagraph, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

PlaceholderParagraph.handledProps = ["as", "children", "className", "content"];
PlaceholderParagraph.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default PlaceholderParagraph;