import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createHTMLImage, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A comment can contain an image or avatar.
 */

function CommentAvatar(props) {
  var className = props.className,
      src = props.src;
  var classes = cx('avatar', className);
  var rest = getUnhandledProps(CommentAvatar, props);
  var ElementType = getElementType(CommentAvatar, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), createHTMLImage(src, {
    autoGenerateKey: false
  }));
}

CommentAvatar.handledProps = ["as", "className", "src"];
CommentAvatar.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** Specifies the URL of the image. */
  src: PropTypes.string
} : {};
export default CommentAvatar;