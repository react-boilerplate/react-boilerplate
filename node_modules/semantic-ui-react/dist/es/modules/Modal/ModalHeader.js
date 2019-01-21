import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A modal can have a header.
 */

function ModalHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx(className, 'header');
  var rest = getUnhandledProps(ModalHeader, props);
  var ElementType = getElementType(ModalHeader, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ModalHeader.handledProps = ["as", "children", "className", "content"];
ModalHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
ModalHeader.create = createShorthandFactory(ModalHeader, function (content) {
  return {
    content: content
  };
});
export default ModalHeader;