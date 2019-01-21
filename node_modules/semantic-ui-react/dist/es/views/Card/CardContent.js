import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthand, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useTextAlignProp } from '../../lib';
import CardDescription from './CardDescription';
import CardHeader from './CardHeader';
import CardMeta from './CardMeta';
/**
 * A card can contain blocks of content or extra content meant to be formatted separately from the main content.
 */

function CardContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      extra = props.extra,
      header = props.header,
      meta = props.meta,
      textAlign = props.textAlign;
  var classes = cx(useKeyOnly(extra, 'extra'), useTextAlignProp(textAlign), 'content', className);
  var rest = getUnhandledProps(CardContent, props);
  var ElementType = getElementType(CardContent, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  if (!childrenUtils.isNil(content)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), content);
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), createShorthand(CardHeader, function (val) {
    return {
      content: val
    };
  }, header, {
    autoGenerateKey: false
  }), createShorthand(CardMeta, function (val) {
    return {
      content: val
    };
  }, meta, {
    autoGenerateKey: false
  }), createShorthand(CardDescription, function (val) {
    return {
      content: val
    };
  }, description, {
    autoGenerateKey: false
  }));
}

CardContent.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "meta", "textAlign"];
CardContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for CardDescription. */
  description: customPropTypes.itemShorthand,

  /** A card can contain extra content meant to be formatted separately from the main content. */
  extra: PropTypes.bool,

  /** Shorthand for CardHeader. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for CardMeta. */
  meta: customPropTypes.itemShorthand,

  /** A card content can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified'))
} : {};
export default CardContent;