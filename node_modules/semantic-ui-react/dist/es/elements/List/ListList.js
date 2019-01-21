import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A list can contain a sub list.
 */

function ListList(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var rest = getUnhandledProps(ListList, props);
  var ElementType = getElementType(ListList, props);
  var classes = cx(useKeyOnly(ElementType !== 'ul' && ElementType !== 'ol', 'list'), className);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ListList.handledProps = ["as", "children", "className", "content"];
ListList.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default ListList;