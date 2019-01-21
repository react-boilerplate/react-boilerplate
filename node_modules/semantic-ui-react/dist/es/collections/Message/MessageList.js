import _extends from "@babel/runtime/helpers/extends";
import _map from "lodash/map";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import MessageItem from './MessageItem';
/**
 * A message can contain a list of items.
 */

function MessageList(props) {
  var children = props.children,
      className = props.className,
      items = props.items;
  var classes = cx('list', className);
  var rest = getUnhandledProps(MessageList, props);
  var ElementType = getElementType(MessageList, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? _map(items, MessageItem.create) : children);
}

MessageList.handledProps = ["as", "children", "className", "items"];
MessageList.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand Message.Items. */
  items: customPropTypes.collectionShorthand
} : {};
MessageList.defaultProps = {
  as: 'ul'
};
MessageList.create = createShorthandFactory(MessageList, function (val) {
  return {
    items: val
  };
});
export default MessageList;