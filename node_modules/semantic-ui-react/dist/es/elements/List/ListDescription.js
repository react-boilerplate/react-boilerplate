import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A list item can contain a description.
 */

function ListDescription(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx(className, 'description');
  var rest = getUnhandledProps(ListDescription, props);
  var ElementType = getElementType(ListDescription, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ListDescription.handledProps = ["as", "children", "className", "content"];
ListDescription.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
ListDescription.create = createShorthandFactory(ListDescription, function (content) {
  return {
    content: content
  };
});
export default ListDescription;