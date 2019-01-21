import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A placeholder segment can be inline.
 */

function SegmentInline(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('inline', className);
  var rest = getUnhandledProps(SegmentInline, props);
  var ElementType = getElementType(SegmentInline, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

SegmentInline.handledProps = ["as", "children", "className", "content"];
SegmentInline.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default SegmentInline;