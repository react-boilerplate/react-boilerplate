import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A modal can contain content.
 */

function ModalContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      image = props.image,
      scrolling = props.scrolling;
  var classes = cx(className, useKeyOnly(image, 'image'), useKeyOnly(scrolling, 'scrolling'), 'content');
  var rest = getUnhandledProps(ModalContent, props);
  var ElementType = getElementType(ModalContent, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

ModalContent.handledProps = ["as", "children", "className", "content", "image", "scrolling"];
ModalContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A modal can contain image content. */
  image: PropTypes.bool,

  /** A modal can use the entire size of the screen. */
  scrolling: PropTypes.bool
} : {};
ModalContent.create = createShorthandFactory(ModalContent, function (content) {
  return {
    content: content
  };
});
export default ModalContent;