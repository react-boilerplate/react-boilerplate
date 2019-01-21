import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A message list can contain an item.
 */

function MessageItem(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('content', className);
  var rest = getUnhandledProps(MessageItem, props);
  var ElementType = getElementType(MessageItem, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

MessageItem.handledProps = ["as", "children", "className", "content"];
MessageItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
MessageItem.defaultProps = {
  as: 'li'
};
MessageItem.create = createShorthandFactory(MessageItem, function (content) {
  return {
    content: content
  };
});
export default MessageItem;