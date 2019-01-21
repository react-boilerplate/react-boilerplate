import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI } from '../../lib';
/**
 * A group of images.
 */

function ImageGroup(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      size = props.size;
  var classes = cx('ui', size, className, 'images');
  var rest = getUnhandledProps(ImageGroup, props);
  var ElementType = getElementType(ImageGroup, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ImageGroup.handledProps = ["as", "children", "className", "content", "size"];
ImageGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A group of images can be formatted to have the same size. */
  size: PropTypes.oneOf(SUI.SIZES)
} : {};
export default ImageGroup;