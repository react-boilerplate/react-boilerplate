import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A comment can contain an author.
 */

function CommentAuthor(props) {
  var className = props.className,
      children = props.children,
      content = props.content;
  var classes = cx('author', className);
  var rest = getUnhandledProps(CommentAuthor, props);
  var ElementType = getElementType(CommentAuthor, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

CommentAuthor.handledProps = ["as", "children", "className", "content"];
CommentAuthor.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default CommentAuthor;