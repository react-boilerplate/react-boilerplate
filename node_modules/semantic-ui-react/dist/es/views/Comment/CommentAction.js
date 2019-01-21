import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A comment can contain an action.
 */

function CommentAction(props) {
  var active = props.active,
      className = props.className,
      children = props.children,
      content = props.content;
  var classes = cx(useKeyOnly(active, 'active'), className);
  var rest = getUnhandledProps(CommentAction, props);
  var ElementType = getElementType(CommentAction, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

CommentAction.handledProps = ["active", "as", "children", "className", "content"];
CommentAction.defaultProps = {
  as: 'a'
};
CommentAction.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Style as the currently active action. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default CommentAction;