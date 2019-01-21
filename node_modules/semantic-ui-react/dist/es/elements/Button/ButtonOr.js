import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * Button groups can contain conditionals.
 */

function ButtonOr(props) {
  var className = props.className,
      text = props.text;
  var classes = cx('or', className);
  var rest = getUnhandledProps(ButtonOr, props);
  var ElementType = getElementType(ButtonOr, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    "data-text": text
  }));
}

ButtonOr.handledProps = ["as", "className", "text"];
ButtonOr.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** Or buttons can have their text localized, or adjusted by using the text prop. */
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : {};
export default ButtonOr;