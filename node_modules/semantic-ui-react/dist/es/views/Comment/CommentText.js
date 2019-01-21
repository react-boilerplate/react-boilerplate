import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A comment can contain text.
 */

function CommentText(props) {
  var className = props.className,
      children = props.children,
      content = props.content;
  var classes = cx(className, 'text');
  var rest = getUnhandledProps(CommentText, props);
  var ElementType = getElementType(CommentText, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

CommentText.handledProps = ["as", "children", "className", "content"];
CommentText.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default CommentText;