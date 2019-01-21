import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createHTMLImage, customPropTypes, getElementType, getUnhandledProps, htmlImageProps, partitionHTMLProps } from '../../lib';
/**
 * A comment can contain an image or avatar.
 */

function CommentAvatar(props) {
  var className = props.className,
      src = props.src;
  var classes = cx('avatar', className);
  var rest = getUnhandledProps(CommentAvatar, props);

  var _partitionHTMLProps = partitionHTMLProps(rest, {
    htmlProps: htmlImageProps
  }),
      _partitionHTMLProps2 = _slicedToArray(_partitionHTMLProps, 2),
      imageProps = _partitionHTMLProps2[0],
      rootProps = _partitionHTMLProps2[1];

  var ElementType = getElementType(CommentAvatar, props);
  return React.createElement(ElementType, _extends({}, rootProps, {
    className: classes
  }), createHTMLImage(src, {
    autoGenerateKey: false,
    defaultProps: imageProps
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