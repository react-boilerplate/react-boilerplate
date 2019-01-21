import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useTextAlignProp } from '../../lib';
/**
 * A card can contain content metadata.
 */

function CardMeta(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      textAlign = props.textAlign;
  var classes = cx(useTextAlignProp(textAlign), 'meta', className);
  var rest = getUnhandledProps(CardMeta, props);
  var ElementType = getElementType(CardMeta, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

CardMeta.handledProps = ["as", "children", "className", "content", "textAlign"];
CardMeta.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A card meta can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified'))
} : {};
export default CardMeta;