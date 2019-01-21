import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';

function LabelDetail(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('detail', className);
  var rest = getUnhandledProps(LabelDetail, props);
  var ElementType = getElementType(LabelDetail, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

LabelDetail.handledProps = ["as", "children", "className", "content"];
LabelDetail.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
LabelDetail.create = createShorthandFactory(LabelDetail, function (val) {
  return {
    content: val
  };
});
export default LabelDetail;