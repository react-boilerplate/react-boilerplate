import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import CommentAction from './CommentAction';
import CommentActions from './CommentActions';
import CommentAuthor from './CommentAuthor';
import CommentAvatar from './CommentAvatar';
import CommentContent from './CommentContent';
import CommentGroup from './CommentGroup';
import CommentMetadata from './CommentMetadata';
import CommentText from './CommentText';
/**
 * A comment displays user feedback to site content.
 */

function Comment(props) {
  var className = props.className,
      children = props.children,
      collapsed = props.collapsed,
      content = props.content;
  var classes = cx(useKeyOnly(collapsed, 'collapsed'), 'comment', className);
  var rest = getUnhandledProps(Comment, props);
  var ElementType = getElementType(Comment, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

Comment.handledProps = ["as", "children", "className", "collapsed", "content"];
Comment.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Comment can be collapsed, or hidden from view. */
  collapsed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
Comment.Author = CommentAuthor;
Comment.Action = CommentAction;
Comment.Actions = CommentActions;
Comment.Avatar = CommentAvatar;
Comment.Content = CommentContent;
Comment.Group = CommentGroup;
Comment.Metadata = CommentMetadata;
Comment.Text = CommentText;
export default Comment;