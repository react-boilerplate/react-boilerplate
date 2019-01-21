import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A comment can contain an list of actions a user may perform related to this comment.
 */

function CommentActions(props) {
  var className = props.className,
      children = props.children,
      content = props.content;
  var classes = cx('actions', className);
  var rest = getUnhandledProps(CommentActions, props);
  var ElementType = getElementType(CommentActions, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

CommentActions.handledProps = ["as", "children", "className", "content"];
CommentActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default CommentActions;