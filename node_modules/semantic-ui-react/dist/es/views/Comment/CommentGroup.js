import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly } from '../../lib';
/**
 * Comments can be grouped.
 */

function CommentGroup(props) {
  var className = props.className,
      children = props.children,
      collapsed = props.collapsed,
      content = props.content,
      minimal = props.minimal,
      size = props.size,
      threaded = props.threaded;
  var classes = cx('ui', size, useKeyOnly(collapsed, 'collapsed'), useKeyOnly(minimal, 'minimal'), useKeyOnly(threaded, 'threaded'), 'comments', className);
  var rest = getUnhandledProps(CommentGroup, props);
  var ElementType = getElementType(CommentGroup, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

CommentGroup.handledProps = ["as", "children", "className", "collapsed", "content", "minimal", "size", "threaded"];
CommentGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Comments can be collapsed, or hidden from view. */
  collapsed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Comments can hide extra information unless a user shows intent to interact with a comment. */
  minimal: PropTypes.bool,

  /** Comments can have different sizes. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** A comment list can be threaded to showing the relationship between conversations. */
  threaded: PropTypes.bool
} : {};
export default CommentGroup;