import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';

function TableBody(props) {
  var children = props.children,
      className = props.className;
  var classes = cx(className);
  var rest = getUnhandledProps(TableBody, props);
  var ElementType = getElementType(TableBody, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), children);
}

TableBody.handledProps = ["as", "children", "className"];
TableBody.defaultProps = {
  as: 'tbody'
};
TableBody.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string
} : {};
export default TableBody;